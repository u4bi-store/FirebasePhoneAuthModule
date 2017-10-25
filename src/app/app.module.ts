import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { environment } from './environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { FirebasePhoneAuthService } from './providers/firebase-phone-auth.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [FirebasePhoneAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
