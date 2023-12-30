import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, take } from 'rxjs';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';

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

  async getCart(): Promise<Observable<ShoppingCart | null>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<ShoppingCart>('/shopping-carts/' + cartId).valueChanges().
      pipe(map(x => { if (x) return new ShoppingCart(x.items); return null }));
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
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      item$.update({
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: (item?.quantity || 0) + change
      });
    });
  }
}