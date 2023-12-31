import { Component } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Observable, of } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cart$: Observable<ShoppingCart | null> = of();
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }
}
