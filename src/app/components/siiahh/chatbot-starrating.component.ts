import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service'; // Corrige para MessageService
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chatbot-starrating',
  templateUrl: './chatbot-starrating.component.html',
  styleUrls: ['./chatbot-starrating.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
})
export class ChatbotStarratingComponent {
  @Input() rating: number = 0;
  @Input() maxRating: number = 3; // Atualizando para 3 conforme o backend
  @Input() messageId: string = ''; // ID da mensagem
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  stars: boolean[] = [];

  constructor(private messageService: MessageService) {} // Corrigido para MessageService

  ngOnInit() {
    this.stars = Array(this.maxRating).fill(false);
  }

  rate(star: number) {
    this.rating = star;
    this.ratingChange.emit(this.rating);

    // Envia o rating para o backend através do MessageService
    this.messageService
      .rateMessage(this.messageId, {
        value: this.rating,
        message_type: 'assistant',
      })
      .subscribe({
        next: (response: any) => {  // Corrigido o tipo implícito 'any'
          console.log('Rating enviado com sucesso', response);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erro ao enviar o rating:', error.message);
        },
      });
  }
}
