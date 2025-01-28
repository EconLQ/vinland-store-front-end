import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../common/blog';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { BlogsPageResponse } from '../interfaces/blog-page-response';

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
    });
  }
}

interface GetResponse {
  _embedded: {
    blogs: Blog[];
  };
}
