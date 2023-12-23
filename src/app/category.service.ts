import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
interface OriginalType {
  key: string;
  payload: {
    val(): { name: string };
  };
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    // return this.db.list('/categories').valueChanges();
    return this.db.list<OriginalType>('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(map(array => array.map(item => ({ key: item.key, ...item.payload.val() }))));
  }
}
