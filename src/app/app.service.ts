import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {
    constructor(private http: Http) { }

    getFullQB() {
        return this.http.get('https://jsonplaceholder.typicode.com/posts/1/comments');
    }
}
