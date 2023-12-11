import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user$: Observable<any> | null;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router

  ) {
    this.user$ = afAuth.authState;
  }
  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);

  }
}
