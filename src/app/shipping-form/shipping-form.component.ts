import { Component, Input } from '@angular/core';
import { Order } from '../shared/models/order';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent {
  shipping: any = {};
  @Input('cart') cart: ShoppingCart | null = null;
  userId!: string;
  userSubscription!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
  ) { }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    if (this.cart) {
      let order = new Order(this.userId, this.shipping, this.cart);
      let result = await this.orderService.placeOrder(order);
      this.router.navigate(['/order-success', result.key]);
    }
  }
}
