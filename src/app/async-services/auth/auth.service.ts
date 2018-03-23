import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private token = localStorage.getItem('access-token');

  constructor() { }

  login(token) {
    this.setToken(token);
  }

  logout() {
    this.setToken('');
  }

  setToken(token) {
    this.token = token;

    localStorage.setItem('access-token', token);
  }

  getToken() {
    return this.token || '';
  }

  isLoggedIn() {
    return (this.token) ? true : false;
  }
}
