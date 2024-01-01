import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { SharedModule } from 'shared/shared.module';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    ShoppingModule,
    AdminModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDRYbyclcUlvkm57lYTach_TtUhpZDi4eY",
      authDomain: "oshop-9b2ca.firebaseapp.com",
      projectId: "oshop-9b2ca",
      storageBucket: "oshop-9b2ca.appspot.com",
      messagingSenderId: "997564146672",
      appId: "1:997564146672:web:8405c265f359fa8be8f335",
      measurementId: "G-DQ7YR2D65J"
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
