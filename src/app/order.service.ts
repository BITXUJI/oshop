import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  storeOrder(order: any) {
    this.db.list('/orders').push(order);
  }
}
