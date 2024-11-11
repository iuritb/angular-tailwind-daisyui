import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IChat } from 'src/types/chats';
import { NavbarComponent } from 'src/app/components/layout/navbar/navbar.component';
import { SidebarComponent } from 'src/app/components/layout/sidebar/sidebar.component';
import { ChatbotInputComponent } from 'src/app/components/ui/chatbot-input/chatbot-input.component';
import { ChatbotMessagesComponent } from 'src/app/components/ui/chatbot-messages/chatbot-messages.component';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MarkdownModule,
    NavbarComponent,
    SidebarComponent,
    ChatbotMessagesComponent,
    ChatbotInputComponent,
  ],
})
export class MainContentComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent; // Acessa o componente Sidebar

  selectedChat: IChat | null = null;
  selectedIndex: string = ''; // Armazena o índice selecionado
  chatIsLoading: boolean = false;
  isSidebarExpanded: boolean = true; // Add this line

  ngAfterViewInit() {
    this.sidebar.isExpanded = this.isSidebarExpanded;

    // Subscribe to changes in sidebar expansion state
    this.sidebar.expansionChange.subscribe((isExpanded: boolean) => {
      this.isSidebarExpanded = isExpanded;
    });
  }

  onchatBotLoading(chatIsLoading: boolean) {
    console.log('chat carregando =>', chatIsLoading);
    this.chatIsLoading = chatIsLoading;
  }

  // Função chamada quando um chat é selecionado
  onChatSelected(chat: IChat) {
    this.selectedChat = chat;
    console.log('Chat selecionado no main-content:', chat); // Log para verificar o chat selecionado
  }

  // Função chamada quando o índice é selecionado
  onIndexSelected(index: string) {
    this.selectedIndex = index;
    console.log('Índice selecionado no main-content:', index); // Log para verificar o índice selecionado
  }

  // Função chamada quando um novo chat é criado no ChatbotInputComponent
  onChatCreated(chat: IChat) {
    this.selectedChat = chat; // Atualiza o chat selecionado
    console.log('Novo chat criado:', chat);

    // Expande a sidebar e o histórico de chats usando ViewChild
    if (this.sidebar) {
      this.sidebar.isExpanded = true; // Expande a sidebar
      this.sidebar.isHistoryDropdownOpen = true; // Abre o histórico de chats
    }
  }
}
