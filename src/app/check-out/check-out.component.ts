import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  shipping: any = {};
  cart: ShoppingCart | null = null;
  userId!: string;
  cartSubscription!: Subscription;
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart?.itemsArray.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }

    this.orderService.storeOrder(order);
  }
}
