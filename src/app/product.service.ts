import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Product } from './models/product';
interface OriginalType {
  key: string;
  payload: {
    val(): {
      title: string;
      price: string;
      category: string;
      imageUrl: string;
    };
  };
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    this.db.list('/products').push(product);
  }
  getAll() {
    return this.db.list<OriginalType>('/products').snapshotChanges()
      .pipe(map(array => array.map(
        item => ({ key: item.key, ...item.payload.val() }))));
  }
  get(productId: string) {
    return this.db.object('/products/' + productId).valueChanges();
  }
  update(productId: string, product: Product) {
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
