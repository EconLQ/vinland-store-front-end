import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { UserSignUpRequest } from '../../../interfaces/user-sign-up-request';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  register(signUpForm: NgForm) {
    const signUpRequest: UserSignUpRequest = {
      username: signUpForm.value.username,
      firstName: signUpForm.value.firstName,
      lastName: signUpForm.value.lastName,
      email: signUpForm.value.email,
      password: signUpForm.value.password,
    };
    this.authService.register(signUpRequest).subscribe(
      (response) => {
        this.router.navigateByUrl('/sign-in');
      },
      (error) => {
        if (error.status === 400) {
          this.errorMessage = error.error.message;
        }
        console.log('Error signing up: ', error);
      }
    );
  }
}
