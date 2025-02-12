import { Component } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { Blog } from '../../../common/blog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../../utils/date-format.pipe';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [RouterLink, CommonModule, DateFormatPipe],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailsComponent {
  errorMessage: string = '';
  blog: Blog | undefined;
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.loadBlogById(id);
      }
    });
  }

  loadBlogById(id: number) {
    this.blogService.getBlogById(id).subscribe({
      next: (data) => {
        this.blog = data;
        console.debug(data);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
    });
  }
}
