import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebasePhoneAuthService {

  user : Observable<firebase.User>;
  
  constructor(private firebaseAuth: AngularFireAuth){

    this.user = firebaseAuth.authState;
    console.log(this.user);

    this.user.subscribe(e => {
      if(e) console.log('user phone number ', e.phoneNumber);
    });

  }

  createRecaptcha = () => new firebase.auth.RecaptchaVerifier('recaptcha-container');


  sendLoginCode(){

  }

  verifyLoginCode(){
    
  }

}
