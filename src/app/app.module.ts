import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
