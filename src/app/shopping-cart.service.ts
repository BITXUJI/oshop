import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

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
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges();
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      if (result.key) {
        localStorage.setItem('cartId', result.key);
        return this.getCart(result.key);
      } else {
        return null;
      }
    } else return this.getCart(cartId);
  }

  addToCart(product: any) {

  }
}


