import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

import { CommonModule } from '@angular/common';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-select-knowledge-base',
  templateUrl: './select-knowledge-base.component.html',
  styleUrls: ['./select-knowledge-base.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
})
export class SelectKnowledgeBaseComponent {
  selectedValue: string = ''; // Armazena o valor selecionado
  indices: string[] = []; // Lista de índices

  @Output() indexSelected = new EventEmitter<string>(); // Emite o índice selecionado

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    // this.authService
    //   .getIndices()
    //   .then((indices) => {
    //     this.indices = indices || [];
    //     if (this.indices.length > 0) {
    //       // Seleciona automaticamente o primeiro índice
    //       this.selectedValue = this.indices[0];
    //       this.indexSelected.emit(this.selectedValue); // Emite o índice inicial automaticamente
    //       console.log('Índice inicial selecionado:', this.selectedValue);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao carregar índices:', error);
    //   });
  }

  onSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value; // Atualiza o valor selecionado
    this.indexSelected.emit(this.selectedValue); // Emite o índice selecionado
    console.log('Índice selecionado:', this.selectedValue);
  }
}
