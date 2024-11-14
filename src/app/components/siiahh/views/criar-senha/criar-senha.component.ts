//Angular
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Service
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-criar-senha',
  templateUrl: './criar-senha.component.html',
  styleUrls: ['./criar-senha.component.scss']
})
export class CriarSenhaComponent {
  matricula: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.matricula = this.route.snapshot.queryParamMap.get('matricula') || '';
  }

  async setPassword() {
    if (!this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    try {
      await this.userService.setPassword(this.matricula, this.password);
      this.router.navigate(['/login'], { queryParams: { matricula: this.matricula } });
    } catch (error) {
      console.error('Erro ao criar senha', error);
      this.errorMessage = 'Erro ao criar senha';
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
