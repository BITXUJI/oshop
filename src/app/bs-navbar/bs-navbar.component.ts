import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser | any;
  shoppingCartItemCount: number = 0;

  constructor(
    private auth: AuthService,
    private router: Router,
    private shopppingCartService: ShoppingCartService
  ) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shopppingCartService.getCart();
    cart$.subscribe(
      cart => {
        this.shoppingCartItemCount = 0;
        for (const productId in cart?.items) {
          this.shoppingCartItemCount += (cart?.items)[productId as any].quantity;
        }
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
