import {
  Component,
  EventEmitter,
  Input,
  Output,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { KnowledgeBaseService } from 'src/app/services/knowledge-base.service';
import { DialogChatConfigurationComponent } from 'src/app/components/ui/dialog-chat-configuration/dialog-chat-configuration.component';
import { AuthService } from 'src/app/services/auth.service';
import { IChat } from 'src/types/chats';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowRightOnRectangle,
  heroBookOpen,
  heroChatBubbleLeftEllipsis,
  heroChevronDown,
  heroClock,
  heroCog6Tooth,
  heroUserGroup,
  heroUsers
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIconComponent,
    DialogChatConfigurationComponent,
  ],
  viewProviders: [
    provideIcons({
      heroArrowRightOnRectangle,
      heroBookOpen,
      heroChatBubbleLeftEllipsis,
      heroChevronDown,
      heroClock,
      heroCog6Tooth,
      heroUserGroup,
      heroUsers
    }),
  ],
})
export class SidebarComponent {
  @Output() chatSelected = new EventEmitter<IChat>();
  @Output() indexSelected = new EventEmitter<string>();
  @Input() onchatBotLoading: boolean = false;
  @Output() expansionChange = new EventEmitter<boolean>();

  selectedIndex: string = '';
  public isExpanded = true;
  public isKnowledgeDropdownOpen = false;
  public isHistoryDropdownOpen = false;
  public isConfigDropdownOpen = false;
  public selectedKnowledgeBase: string | null = null;
  public knowledgeBases: string[] = [];
  public chats: IChat[] = [];
  public showChatConfig: boolean = false;

  constructor(
    private chatService: ChatService,
    private knowledgeBaseService: KnowledgeBaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadKnowledgeBases();
    this.loadUserChats();

    // Escuta o evento de novo chat criado e atualiza o histórico de chats
    this.chatService.newChatCreated$.subscribe((newChat: IChat | null) => {
      if (newChat) {
        console.log(
          'Novo chat criado ou atualizado, recarregando o histórico de chats'
        );
        this.loadUserChats();
        this.isHistoryDropdownOpen = true; // Expande o histórico automaticamente ao criar um chat
        this.isExpanded = true; // Garante que a sidebar esteja expandida
        this.expansionChange.emit(this.isExpanded); // Notifica a mudança de expansão
      }
    });
  }

  closeAllDropdowns(): void {
    this.isKnowledgeDropdownOpen = false;
    this.isHistoryDropdownOpen = false;
    this.isConfigDropdownOpen = false;
  }

  // Centraliza o carregamento de índices
  loadKnowledgeBases() {
    this.knowledgeBaseService.getSearchIndices().subscribe({
      next: (data) => {
        this.knowledgeBases = data.indices;
      },
      error: (error) => {
        console.error('Erro ao carregar bases de conhecimento:', error);
      },
    });
  }

  // Centraliza o carregamento dos chats
  loadUserChats(): void {
    this.chatService
      .getUserChats()
      .then((chats: IChat[]) => {
        this.chats = chats;
        console.log('Histórico de chats carregado:', this.chats);
      })
      .catch((error) => {
        console.error('Erro ao carregar histórico de chats:', error);
      });
  }

  // Lógica para abrir e fechar os dropdowns
  toggleKnowledgeDropdown(): void {
    this.isKnowledgeDropdownOpen = !this.isKnowledgeDropdownOpen;
    if (this.isKnowledgeDropdownOpen) {
      this.isHistoryDropdownOpen = false;
      this.isConfigDropdownOpen = false;
    }
  }

  toggleHistoryDropdown(): void {
    this.isHistoryDropdownOpen = !this.isHistoryDropdownOpen;
    if (this.isHistoryDropdownOpen) {
      this.isKnowledgeDropdownOpen = false;
      this.isConfigDropdownOpen = false;
    }
  }

  toggleConfigDropdown(): void {
    this.isConfigDropdownOpen = !this.isConfigDropdownOpen;
    if (this.isConfigDropdownOpen) {
      this.isHistoryDropdownOpen = false;
      this.isKnowledgeDropdownOpen = false;
    }
  }

  openChatConfiguration(): void {
    this.showChatConfig = true;
    console.log('Configurações de chat abertas');
  }

  closeChatConfiguration(): void {
    this.showChatConfig = false;
    console.log('Configurações de chat fechadas');
  }

  handleNewChat(): void {
    this.createNewChat();
    this.expandSidebar();
    this.isHistoryDropdownOpen = true;
    this.isKnowledgeDropdownOpen = false;
    this.isConfigDropdownOpen = false;
  }

  createNewChat() {
    this.chatService
      .createChat()
      .then((newChat: IChat | null) => {
        if (newChat) {
          this.chatSelected.emit(newChat);
          this.loadUserChats();
        }
      })
      .catch((error) => {
        console.error('Erro ao criar novo chat:', error);
      });
  }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    if (!this.isExpanded) this.closeAllDropdowns();
    this.expansionChange.emit(this.isExpanded);
  }

  expandSidebar(): void {
    if (!this.isExpanded) {
      this.isExpanded = true;
    }
  }

  onChatSelected(chat: IChat): void {
    this.chatSelected.emit(chat);
  }

  onIndexSelected(index: string): void {
    this.selectedIndex = index;
    console.log('Índice selecionado na sidebar:', this.selectedIndex);
    this.indexSelected.emit(this.selectedIndex);
  }

  openRtcInNemTab() {
    let rtcUrl = 'http://siiah.labs.des.caixa:9096/';
    window.open(rtcUrl, '_blank');
  }

  openVideoIndexerInNewTab() {
    let rtcUrl = 'http://siiah.labs.des.caixa:9098';
    window.open(rtcUrl, '_blank');
  }

  handleItemClick() {
    if (!this.isExpanded) {
      this.isExpanded = true;
      this.expansionChange.emit(this.isExpanded);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
