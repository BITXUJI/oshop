import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'shared/shared.module';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ShoppingModule,
    AdminModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
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
