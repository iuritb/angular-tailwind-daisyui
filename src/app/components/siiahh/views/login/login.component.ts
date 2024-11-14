import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  matricula: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.matricula = params['matricula'] || '';
    });
  }

  async login() {
    try {
      const response = await this.authService.login(this.matricula, this.password);
      this.router.navigate(['/chat']);
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        this.errorMessage = 'Matrícula ou senha inválida';
      } else {
        this.errorMessage = 'Erro ao tentar fazer login';
      }
      console.error('Login error:', error);
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
