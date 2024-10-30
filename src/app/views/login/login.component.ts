import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // Lógica de validação (simplesmente redirecionando neste exemplo)
    if (this.username && this.password) {
      this.router.navigate(['/conteudo']);
    } else {
      alert('Por favor, insira o usuário e a senha.');
    }
  }
}
