import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private localStorage: LocalStorageService) { }
  token: String = ''

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.authService.isAdmin().then((auth) => {
    //   if (auth) {
    //     return true
    //   } else {
    //     return false
    //   }
    // })
    if (JSON.parse(this.localStorage.get('auth')).token) {
      return true
    }else{
      return false
    }
  }



}
