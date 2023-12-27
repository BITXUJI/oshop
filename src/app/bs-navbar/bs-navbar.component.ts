import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable, of } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser | any;
  cart$: Observable<ShoppingCart | null> = of();

  constructor(
    private auth: AuthService,
    private router: Router,
    private shopppingCartService: ShoppingCartService
  ) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shopppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
