import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(url);
  }

  post(url, body) {
    return this.http.post(url, body);
  }
}
