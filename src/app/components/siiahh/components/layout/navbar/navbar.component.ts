import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IProfile } from 'src/types/user';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowRightOnRectangle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIconComponent,
  ],
  viewProviders: [provideIcons({ heroArrowRightOnRectangle })],
})
export class NavbarComponent {
  public userProfile: IProfile | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.userProfile = this.userService.getUserProfile();
  }

  logoff() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
