import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = JSON.parse(this.localStorage.get('auth')) === null ? "" : JSON.parse(this.localStorage.get('auth')).token
    console.log("token", token)
    const newRequest = request.clone({
      setHeaders: {
        'x-access-token': token
      }
    })
    return next.handle(newRequest);
  }
}
