import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { switchMap, Observable, of } from 'rxjs';
import { AppUser } from '../models/app-user';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser | any;
  constructor(
    private UserService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
