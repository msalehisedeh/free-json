import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  getFullQB() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1/comments');
  }
}
