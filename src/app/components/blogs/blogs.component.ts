import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { Blog } from '../../common/blog';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DateFormatPipe } from '../../utils/date-format.pipe';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, DateFormatPipe],
  providers: [BlogService],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  pageSize = 5;
  pageIndex = 0;
  totalElements = 0;
  errorMessage: string = '';

  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.loadBlogs();
  }
  loadBlogs() {
    this.blogService.getBlogs(this.pageIndex, this.pageSize).subscribe(
      (response) => {
        this.blogs = response._embedded.blogs;
        this.totalElements = response.page.totalElements;
        this.pageSize = response.page.size;
        this.pageIndex = response.page.number;
      },
      (error) => {
        if (error.status == 403) {
          this.errorMessage = 'Failed to authorize user. Please log in.';
        }
        console.log(error);
      }
    );
  }
  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBlogs();
  }
}
