import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { IChat } from 'src/types/chats';
import { IMessages } from 'src/types/messages';
import { ChatbotStarratingComponent } from '../chatbot-starrating/chatbot-starrating.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { ChatSkeletonComponent } from '../../layout/chat-skeleton/chat-skeleton.component';

interface RenderedMessage {
  user_message: string;
  assistant_message: string | null;
  rating: number;
  messageId: string;
}

@Component({
  selector: 'app-chatbot-messages',
  templateUrl: './chatbot-messages.component.html',
  styleUrls: ['./chatbot-messages.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MarkdownModule,
    ChatbotStarratingComponent,
    ChatSkeletonComponent,
  ],
  providers: [MarkdownService],
})
export class ChatbotMessagesComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy, OnChanges
{
  @Input() chat: IChat | null = null;
  @Input() onchatBotLoading: boolean = false;
  @Output() messageRated = new EventEmitter<boolean>();
  messages: IMessages[] = [];
  renderedMessages: RenderedMessage[] = [];
  private messagesSubscription!: Subscription;

  @ViewChild('chatContainer', { static: false })
  private chatContainer!: ElementRef;

  constructor(
    private messageService: MessageService,
    private markdownService: MarkdownService
  ) {}

  ngOnInit(): void {
    this.messagesSubscription = this.messageService.messages$.subscribe({
      next: (messages) => {
        this.messages = messages;
        this.renderMessages();
      },
      error: (error) => {
        console.error('Erro ao carregar mensagens:', error);
      },
    });
  }

  ngAfterViewInit(): void {
    // Verifique se o chatContainer está disponível antes de tentar rolar
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    // Rola para o final após a visualização ser atualizada
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chat'] && this.chat) {
      console.log('Chat selecionado mudou, carregando mensagens...');

      this.messageService.clearMessages();
      this.messages = [];
      this.renderedMessages = [];

      this.onchatBotLoading = true;
      this.loadMessages(this.chat._id);
    }
  }

  ngOnDestroy(): void {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  loadMessages(chatId: string) {
    this.onchatBotLoading = true;
    this.messagesSubscription = this.messageService
      .getMessagesByChatId(chatId)
      .subscribe({
        next: () => {},
        error: (error) => {
          console.error('Erro ao carregar mensagens:', error);
          this.onchatBotLoading = false;
        },
        complete: () => {
          this.onchatBotLoading = false;
        },
      });
  }

  async renderMessages() {
    this.onchatBotLoading = true;
    this.renderedMessages = [];

    for (const message of this.messages) {
      const renderedMessage: RenderedMessage = {
        user_message: message.user_message?.content || '',
        assistant_message: message.assistant_message?.content || null,
        rating: message.assistant_message?.rating?.value || 0,
        messageId:
          typeof message._id === 'string' ? message._id : message._id.$oid,
      };

      // Parse Markdown content
      renderedMessage.user_message = await Promise.resolve(
        this.markdownService.parse(renderedMessage.user_message)
      );

      if (renderedMessage.assistant_message) {
        renderedMessage.assistant_message = await Promise.resolve(
          this.markdownService.parse(renderedMessage.assistant_message)
        );
      }

      this.renderedMessages.push(renderedMessage);
    }

    const lastAssistantMessage = this.renderedMessages
      .filter((m) => m.assistant_message)
      .slice(-1)[0];
    const isRated = lastAssistantMessage ? !!lastAssistantMessage.rating : true;

    this.messageRated.emit(isRated);

    this.onchatBotLoading = false;

    // Scroll to bottom after messages are rendered
    setTimeout(() => {
      this.scrollToBottom();
    }, 50);

    this.reRenderMathJax();
  }

  reRenderMathJax() {
    setTimeout(() => {
      if ((window as any).MathJax && (window as any).MathJax.typesetPromise) {
        (window as any).MathJax.typesetPromise().catch((err: any) =>
          console.log('Erro no MathJax:', err)
        );
      } else {
        console.log('MathJax não está disponível');
      }
    }, 0);
  }

  private scrollToBottom(): void {
    if (this.chatContainer && this.chatContainer.nativeElement) {
      try {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Não foi possível rolar para o final', err);
      }
    }
  }

  // Função chamada quando o rating é alterado no componente de avaliação de estrelas
  onRatingChange(messageId: string, rating: number): void {
    this.messageService
      .rateMessage(messageId, { value: rating, message_type: 'assistant' })
      .subscribe({
        next: (response) => {
          console.log('Rating atualizado com sucesso', response);
          const message = this.renderedMessages.find(
            (m) => m.messageId === messageId
          );
          if (message) {
            message.rating = rating;

            const lastAssistantMessage = this.renderedMessages
              .filter((m) => m.assistant_message)
              .slice(-1)[0];
            const isRated = lastAssistantMessage
              ? !!lastAssistantMessage.rating
              : true;

            this.messageRated.emit(isRated);
          }
        },
        error: (error) => {
          console.error('Erro ao atualizar o rating:', error);
        },
      });
  }
}
