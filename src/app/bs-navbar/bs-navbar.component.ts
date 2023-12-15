import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { map, switchMap, Observable, of } from 'rxjs';
import { AppUser } from '../models/app-user';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser$: Observable<AppUser | null>;
  constructor(
    private UserService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
    this.appUser$ = this.auth.user$
      .pipe(switchMap(user => {
        if (user) {
          return this.UserService.get(user.uid);
        }
        return of(null);
      }));
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
