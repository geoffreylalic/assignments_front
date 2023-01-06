import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private localStorage: LocalStorageService, private router: Router, private route: ActivatedRoute) { }
  token: String = ''

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (JSON.parse(this.localStorage.get('auth')) !== null && JSON.parse(this.localStorage.get('auth')).token) {
      return true
    } else {
      this.router.navigate(['/signin'], { relativeTo: this.route });
      return false
    }
  }



}
