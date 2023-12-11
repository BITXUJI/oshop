import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user: any | null;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router

  ) {
    afAuth.authState.subscribe(user => this.user = user);
  }
  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);

  }
}
