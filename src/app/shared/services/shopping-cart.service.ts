import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, take } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { FirebaseShoppingCart } from '../models/firebase-shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart | null>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<FirebaseShoppingCart>('/shopping-carts/' + cartId)
      .valueChanges().pipe(map(x => {
        if (x) return new ShoppingCart(x.items);
        return null
      }));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
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

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      let quantity = (item?.quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity
      });
    });
  }
}