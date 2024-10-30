import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss']
})
export class ConteudoComponent {
  constructor(private router: Router) {}

  onLogout() {
    this.router.navigate(['/login']);
  }
}
