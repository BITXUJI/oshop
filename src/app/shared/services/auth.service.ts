import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, of, switchMap } from 'rxjs';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).
      then((x) => this.router.navigateByUrl(returnUrl)
      );
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser | any> {
    return this.user$.pipe(switchMap(user => {
      if (user) {
        return this.userService.get(user.uid);
      }
      return of(null);
    }));
  }

}
