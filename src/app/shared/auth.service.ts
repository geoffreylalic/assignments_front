import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../users/user.model';
import { ResponseMessage } from './response-message.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin = false
  constructor(private http: HttpClient,) { }
  uri = 'http://localhost:8010/api/'
  msg = new Subject<any>()

  loggIn() {
    this.isLoggedin = true
  }

  logOut() {
    this.isLoggedin = false
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.uri}login`, user,)
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.uri}logout`, {})
  }


  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.uri}register`, user,)
  }

  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.isLoggedin)
    })
  }

}
