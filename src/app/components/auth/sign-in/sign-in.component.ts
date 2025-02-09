import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(private authService: AuthService) {}

  protected login(loginForm: NgForm) {
    console.log(
      `Login form data: ${loginForm.value.email}: ${loginForm.value.password}`
    );
    this.authService.login({ ...loginForm.value });
  }
}
