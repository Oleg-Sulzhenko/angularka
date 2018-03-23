import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    const customReq = request.clone({
      headers: request.headers.set('token', token)
    });

    console.log('request', request);
    console.log('token', token);

    return next
    .handle(customReq)
    .do((response: HttpEvent<any>) => {
      if (response instanceof HttpResponse) {
        console.log('response', response);

        if (response['url'] === 'http://localhost:3003/login' &&
            response['body']['success']) {
          this.authService.login(response['body']['token']);
        }

        if (response['url'] === 'http://localhost:3003/logout' &&
          response['body']['success']) {
          this.authService.logout();
        }
      }
    })
    .catch(error => {
      if (error instanceof HttpErrorResponse) {
        console.log('http error', error);

        if (error['status'] === 401) {
          console.log('REDIRECT TO LOGIN');
        }
      }

      return Observable.throw(error);
    });
  }
}
