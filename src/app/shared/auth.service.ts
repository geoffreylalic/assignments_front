import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getLoggedUser: EventEmitter<any> = new EventEmitter();
  isLoggedin = false
  // uri = 'http://localhost:8010/api/'
  uri = 'https://assignments-back.onrender.com/api/'
  msg = new Subject<any>()

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.uri}login`, user,)
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.uri}logout`, {})
  }


  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.uri}register`, user,)
  }

  updateUser(id: string, user: User): Observable<any> {
    return this.http.put<any>(`${this.uri}users/${id}/`, user)
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.uri}users/${id}/`)
  }


}
