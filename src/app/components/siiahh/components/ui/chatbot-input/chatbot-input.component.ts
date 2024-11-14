import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';
import { IChat } from 'src/types/chats';
import { IMessages } from 'src/types/messages';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject, firstValueFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chatbot-input',
  templateUrl: './chatbot-input.component.html',
  styleUrls: ['./chatbot-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FormsModule,
  ],
})
export class ChatbotInputComponent implements OnInit, OnDestroy, OnChanges {
  @Input() chatSelected: IChat | null = null;
  @Input() selectedIndex: string = '';
  @Input() blockSendMessage: boolean = false;
  @Output() trySendMessage = new EventEmitter<void>();
  @Output() chatBotIsLoading = new EventEmitter<boolean>();
  @Output() chatCreated = new EventEmitter<IChat>();
  @ViewChild('userInputArea') userInputArea!: ElementRef<HTMLTextAreaElement>;
  maxLines = 8;

  userInput: string = '';
  isSendingMessage: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private chatService: ChatService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.chatService.newChatCreated$
      .pipe(takeUntil(this.destroy$))
      .subscribe((updatedChat: IChat | null) => {
        if (updatedChat) {
          console.log('Novo chat criado ou atualizado:', updatedChat);
          this.chatSelected = updatedChat;
          this.chatService.setCurrentChat(updatedChat);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatSelected'] && this.chatSelected) {
      console.log('Chat selecionado recebido pelo input:', this.chatSelected);
      this.chatService.setCurrentChat(this.chatSelected);
    }
    if (changes['selectedIndex']) {
      console.log('Índice recebido pelo input:', this.selectedIndex);
    }
  }

  onInputClick() {
    if(this.blockSendMessage) {
      this.trySendMessage.emit()
    }
  }

  adjustTextareaHeight(): void {
    const textarea = this.userInputArea.nativeElement;
    textarea.style.height = 'auto'; // Redefine a altura para ajustar o conteúdo atual
    const lineHeight = parseFloat(window.getComputedStyle(textarea).lineHeight);
    const lines = Math.floor(textarea.scrollHeight / lineHeight);

    if (lines > this.maxLines) {
      textarea.style.height = `${lineHeight * this.maxLines}px`; // Limita a altura a 8 linhas
      textarea.style.overflowY = 'auto'; // Mostra a rolagem
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta conforme o conteúdo
      textarea.style.overflowY = 'hidden'; // Esconde a rolagem se abaixo do limite
    }
  }

  private validateInput(): boolean {
    if (!this.userInput.trim()) {
      console.error('A mensagem não pode estar vazia.');
      return false;
    }

    if (!this.selectedIndex) {
      console.error(
        'Por favor, selecione uma base de conhecimento antes de enviar a mensagem.'
      );
      return false;
    }
    if (this.blockSendMessage) {
      console.log("blockSendMessage inside validate Input => ", this.blockSendMessage)
      console.error(
        'Por favor atribua uma nota para a mensagem do assistente antes de enviar sua próxima mensagem '
      );
      return false;
    }

    return true;
  }

  private handleError(errorMessage: string, error?: any): void {
    console.error(errorMessage, error);
    this.setLoadingState(false);
  }

  private setLoadingState(isLoading: boolean): void {
    this.isSendingMessage = isLoading;
    this.chatBotIsLoading.emit(isLoading);
  }

  async sendMessage() {
    if (!this.validateInput()) {
      return;
    }

    this.setLoadingState(true);

    let currentChat = this.chatSelected;

    if (!currentChat) {
      try {
        currentChat = await this.chatService.createChat();
        if (!currentChat) {
          throw new Error('Erro ao criar o chat');
        }
        console.log('Novo chat criado com ID:', currentChat._id);
        this.chatCreated.emit(currentChat);
      } catch (error) {
        this.handleError('Erro ao criar novo chat:', error);
        return;
      }
    }

    if (!currentChat._id) {
      this.handleError('ID do chat não encontrado!');
      return;
    }

    console.log('Usando chat existente com ID:', currentChat._id);

    // Create a temporary message and add it to the MessageService
    const tempMessageId = 'temp-' + Date.now();
    const userInputCopy = this.userInput; // Preserve the user input
    const tempMessage: IMessages = {
      _id: { $oid: tempMessageId },
      user_message: {
        type: 'user',
        content: userInputCopy,
        timestamp: { $date: new Date().toISOString() },
        rating: {
          value: null,
          comment: null,
        },
        references: [],
        token_usage: 0,
        knowledge_base_index_name: this.selectedIndex,
      },
      assistant_message: null, // Assistant message is not yet received
      chat_id: { $oid: currentChat._id },
    };

    // Add the temporary message to the messages array
    this.messageService.addMessage(tempMessage);

    this.userInput = ''; // Clear the input field
    this.setLoadingState(false); // Stop the loading state for the input

    try {
      // Send the message to the backend and wait for the assistant's response
      const response = await firstValueFrom(
        this.messageService.sendMessage(
          currentChat._id,
          userInputCopy,
          this.selectedIndex
        )
      );

      const assistantMessage: IMessages | undefined = response?.message;
      if (assistantMessage) {
        // Update the temporary message with the assistant's response
        this.messageService.updateMessage(tempMessageId, assistantMessage);
      }

      // Handle chat name creation if necessary
      if (!currentChat.name && this.messageService.hasAssistantMessage()) {
        try {
          const updatedChat = await this.chatService.createChatName(
            currentChat._id,
            userInputCopy,
            this.selectedIndex
          );
          currentChat.name = updatedChat.name;
          this.chatSelected = currentChat;
          console.log('Nome do chat criado:', currentChat.name);
          this.chatService.emitNewChatCreated(currentChat);
        } catch (error: any) {
          if (error?.response?.status === 400) {
            console.log(`O chat já possui um nome: ${currentChat.name}`);
          } else if (error?.response?.status === 404) {
            this.handleError(
              'Chat não encontrado para criar nome.',
              error.response?.data?.detail || 'Sem detalhes fornecidos'
            );
          } else {
            this.handleError('Erro ao criar nome do chat:', error);
          }
        }
      } else if (currentChat.name) {
        console.log('O chat já possui um nome:', currentChat.name);
      } else {
        console.warn(
          'Não foi encontrada mensagem do assistente, não é possível criar o nome do chat.'
        );
      }
    } catch (error) {
      this.handleError('Erro ao enviar a mensagem:', error);
      // Optionally, remove the temporary message or mark it as failed
    } finally {
      this.setLoadingState(false);
      // No need to clear userInput again since it's already cleared
    }
  }
}
