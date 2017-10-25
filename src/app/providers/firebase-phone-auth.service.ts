import { Injectable, ElementRef } from '@angular/core';

import * as firebase from 'firebase/app';

@Injectable()
export class FirebasePhoneAuthService {

  phoneAuthUser : any;

  private confirmationResult : any;

  constructor(){}

  createRecaptcha = (elementRef : ElementRef) => {
    let element = document.createElement('div');
    element.id = 'recaptcha-container';
    elementRef.nativeElement.appendChild(element);

    return new firebase.auth.RecaptchaVerifier('recaptcha-container');
  };
    
  sendLoginCode(num : string, appVerifier : any ){
    firebase.auth().signInWithPhoneNumber(num, appVerifier).then(e => this.confirmationResult = e).catch( error => console.log(error));
  }

  verifyLoginCode(verificationCode : string){
    this.confirmationResult.confirm(verificationCode).then(e => this.phoneAuthUser = e.user).catch( error => console.log(error));
  }

}
