import { Injectable, ElementRef } from '@angular/core';
import * as firebase from 'firebase/app';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class FirebasePhoneAuthService {

    private _handler = new Subject<any>();
    private _recaptchaElement : ElementRef;
    private _confirmationResult : any;

    constructor(){}

    subscribe = (callback: any): Subscription => this._handler.subscribe(callback);

    createRecaptcha(elementRef : ElementRef){

        let element = document.createElement('div');
        element.id = 'recaptcha-container';
        elementRef.nativeElement.appendChild(element);
        
        this._recaptchaElement = elementRef;

        return new firebase.auth.RecaptchaVerifier('recaptcha-container');
    }

    removeRecaptcha = () => this._recaptchaElement.nativeElement.remove();    

    
    sendLoginCode(num : string, appVerifier : any ){
        
        firebase.auth().signInWithPhoneNumber(num, appVerifier).then(e => {
            this._confirmationResult = e;
            this._handler.next({ type : 'sendLoginCode', confirmationResult : e });
        }).catch( error => console.error(error));
    }

    verifyLoginCode = (verificationCode : string) => this._confirmationResult.confirm(verificationCode).then(e => this._handler.next({ type : 'verifyLoginCode', verificationData : e }) ).catch( error => console.error(error));

}
