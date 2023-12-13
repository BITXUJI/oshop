import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // private mySubscription: Subscription;

  // constructor(private auth: AuthService, private router: Router) {
  //   this.mySubscription = this.auth.user$.subscribe(user => {
  //     if (user) {
  //       console.log(user);

  //       let returnUrl = localStorage.getItem('returnUrl');
  //       router.navigateByUrl(returnUrl || '/');
  //     }
  //   })
  // }
  // ngOnDestroy() {
  //   if (this.mySubscription) {
  //     this.mySubscription.unsubscribe();
  //   }
  // }
}
