import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    return this.auth.user$.pipe(map(user => {
      if (user) return true;
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }));
  }

}

