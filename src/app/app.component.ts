import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService) {
    if (!this.authService.getAccessToken()) {
      this.authService.refreshToken().subscribe({
        next: () => console.log('Session restored'),
        error: () => console.log('No valid session'),
      });
    }
  }
}
