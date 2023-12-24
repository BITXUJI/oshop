import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs';
import { Product } from './models/product';
interface ShoppingCartItem {
  quantity: number;
  product: {
    title: string;
    price: string;
    category: string;
    imageUrl: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<ShoppingCartItem>('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    if (result.key) {
      localStorage.setItem('cartId', result.key);
      return result.key;
    } else {
      return '';
    }
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      item$.update({
        product: {
          title: product.title,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl
        },
        quantity: (item?.quantity || 0) + 1
      });
    });
  };
}



