import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription'

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { FirebasePhoneAuthService } from './providers/firebase-phone-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  @ViewChild('recaptchaElement')
  public recaptchaElement : ElementRef;

  user : Observable<firebase.User>;
  recaptchaVerifier : any;

  subscription: Subscription;  

  constructor(private firebaseAuth: AngularFireAuth, public authService: FirebasePhoneAuthService){

    this.user = firebaseAuth.authState;
    this.user.subscribe(e => {
      
      if(e) console.log('user phone number ', e.phoneNumber);

    });

    this.subscription = this.authService.subscribe((e) => {
      console.log(e);
    });

  }

  ngOnInit(){
      
    this.recaptchaVerifier = this.authService.createRecaptcha(this.recaptchaElement);
    // this.recaptchaVerifier.render();

  }

  sendLoginCode = (phoneNumber : string) => this.authService.sendLoginCode(phoneNumber, this.recaptchaVerifier);
  verifyLoginCode = (code : string) => this.authService.verifyLoginCode(code);
  removeRecaptcha = () => this.authService.removeRecaptcha();

  unsubscribe(){
    this.subscription.unsubscribe();
  }

}
