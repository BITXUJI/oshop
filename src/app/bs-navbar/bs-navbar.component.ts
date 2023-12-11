import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
