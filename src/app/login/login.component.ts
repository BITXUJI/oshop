import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private afAuth: AngularFireAuth) { }

  login() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (result) => {
        console.log('You have been successfully logged in!');
      }).catch((error) => {
        console.log(error);
      });
    // this.afAuth.signInWithRedirect(new GoogleAuthProvider()).then(
    //   (result) => {
    //     console.log('You have been successfully logged in!');
    //   }).catch((error) => {
    //     console.log(error);
    //   });
  }
}
