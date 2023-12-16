import { AngularFireDatabase, QueryFn } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    // return this.db.list('/categories').valueChanges();
    return this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges();
  }
}
