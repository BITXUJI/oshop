import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: any;
  @Input('show-actions') showActions = true;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: any) {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.cartService.create().
        then(result => {
          if (result.key) {
            localStorage.setItem('cartId', result.key);
            //Add product to cart
          }
        });
    } else {
      // Add product to cart 
    }
  }

}
