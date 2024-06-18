import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog, categories } from '../model/blog';
 
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogURL: string;
  // blogEmail: string;
  // blogCategories: string;

  constructor(private http: HttpClient) {
    // this.blogURL = 'http://localhost:3000/blog';
    // this.blogEmail = 'http://localhost:3000/login-email';
    // this.blogCategories = 'http://localhost:3000/categories';
    this.blogURL = 'https://api.blog.redberryinternship.ge/api';
   }

   logInBlog(data: any): Observable<any> {
    return this.http.post(`${this.blogURL}/login`, data);
  }

  createNewBlog(data: FormData): Observable<any>{
    return this.http.post(`${this.blogURL}/blogs`, data);
  }

  getBlog(): Observable<any>{
    return this.http.get(`${this.blogURL}/blogs`);
  }

  getSingleBlog(id: string): Observable<any>{
    return this.http.get(`${this.blogURL}/blogs/${id}`);
  }

  getCategories(): Observable<any>{
    return this.http.get(`${this.blogURL}/categories`);
  }

}
