import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './components/blogs/blogs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BlogsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front-end';
}
