import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

  user : Observable<firebase.User>;
  recaptchaVerifier : any;

  constructor(private firebaseAuth: AngularFireAuth, public authService: FirebasePhoneAuthService){

    this.user = firebaseAuth.authState;
    this.user.subscribe(e => {
      
      if(e) console.log('user phone number ', e.phoneNumber);

    });

  }

  ngOnInit(){
      
    this.recaptchaVerifier = this.authService.createRecaptcha('recaptcha-container');
    this.recaptchaVerifier.render();

  }

  sendLoginCode = (phoneNumber : string) => this.authService.sendLoginCode(phoneNumber, this.recaptchaVerifier);
  verifyLoginCode = (code : string) => this.authService.verifyLoginCode(code);

}
