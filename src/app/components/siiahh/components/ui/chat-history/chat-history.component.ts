import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { IChat } from 'src/types/chats';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
})
export class ChatHistoryComponent {
  chats: IChat[] = []; // Armazena os chats do usuário

  // Emite o chat selecionado
  @Output() chatSelected = new EventEmitter<IChat>();

  constructor(
    private readonly chatService: ChatService,
  ) {}

  ngOnInit(): void {
    this.loadChatHistory();

    // Escuta o evento de novo chat criado e recarrega o histórico de chats
    this.chatService.newChatCreated$.subscribe((newChat: IChat) => {
      console.log('Novo chat criado ou atualizado, recarregando o histórico de chats');
      this.updateChatHistory(newChat); // Atualiza a lista de chats
    });
  }

  // Função para carregar o histórico de chats
  loadChatHistory(): void {
    this.chatService.getUserChats().subscribe({
      next: (chats) =>{
        this.chats = chats;
        console.log('Histórico de chats carregado:', this.chats);
      },
      error: (error) => {
        console.error('Erro ao carregar o histórico de chats:', error);
      }
    });
  }

  // Função para selecionar um chat
  selectChat(chat: IChat) {
    console.log('Selecionando o chat:', chat);
    this.chatService.setCurrentChat(chat);
    this.chatSelected.emit(chat);
  }

  // Função para atualizar o histórico de chats com o novo chat ou chat atualizado
  updateChatHistory(newChat: IChat): void {
    const chatExists = this.chats.find((chat) => chat._id === newChat._id);
    if (chatExists) {
      // Se o chat já existe, atualiza suas informações (como o nome do chat)
      chatExists.name = newChat.name;
    } else {
      // Caso contrário, adiciona o novo chat à lista
      this.chats.unshift(newChat);
    }
    console.log('Histórico de chats atualizado:', this.chats);
  }
}
