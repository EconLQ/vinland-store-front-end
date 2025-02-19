import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private rotuer: Router) {}

  protected login(loginForm: NgForm) {
    console.debug(
      `Login form data: ${loginForm.value.email}: ${loginForm.value.password}`
    );
    this.authService.login({ ...loginForm.value }).subscribe(
      (response: string) => {
        if (response) {
          this.isLoggedIn = true;
          this.rotuer.navigateByUrl('/');
        }
      },
      (error) => {
        if (error.status === 401) {
          if (error.error.message == 'Token has expired') {
            this.authService.refreshToken().subscribe();
          }
          this.errorMessage = error.error.message;
          console.log(this.errorMessage);
        }
        console.log('Error logging in: ', error);
      }
    );
  }
}
