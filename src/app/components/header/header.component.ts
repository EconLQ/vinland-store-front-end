import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private authService: AuthService, private rotuer: Router) {}

  ngOnInit(): void {
    this.authService.authStatus$.subscribe((status) => {
      this.loggedIn = status;
    });
  }

  logout() {
    this.authService.signOut().subscribe(
      (response) => {
        console.log(response);
        this.loggedIn = false;
        this.rotuer.navigateByUrl('/sign-in');
      },
      (error) => {
        console.log('Error logging out: ', error);
      }
    );
  }
}
