import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any> | null;
  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  login() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }
  logout() {
    this.afAuth.signOut();
  }
}
