import { UserService } from '../../shared/services/user.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private auth: AuthService, private UserService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    return this.auth.appUser$
      .pipe(map(appUser => appUser.isAdmin || false));
  }
}
