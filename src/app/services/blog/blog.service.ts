import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../../common/blog';
import { BlogsPageResponse } from '../../interfaces/blog-page-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogsUrl = environment.apiBaseUrl + '/blogs';
  constructor(private httpClient: HttpClient) {}

  getBlogs(
    page: number = 0,
    size: number = 5
  ): Observable<BlogsPageResponse<Blog>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<BlogsPageResponse<Blog>>(`${this.blogsUrl}`, {
      params,
      withCredentials: true,
    });
  }

  getBlogById(id: number): Observable<Blog> {
    return this.httpClient.get<Blog>(`${this.blogsUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
