import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin = false
  constructor() { }

  loggIn() {
    this.isLoggedin = true
  }

  logOut() {
    this.isLoggedin = false
  }

  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.isLoggedin)
    })
  }

}
