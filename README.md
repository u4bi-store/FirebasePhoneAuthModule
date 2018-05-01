## Phone number Authentication for Angular4firebase

> [FirebasePhoneAuthService.ts](https://github.com/myungjaeyu/FirebasePhoneAuthModule/blob/master/src/app/providers/firebase-phone-auth.service.ts)

```ts
import { Injectable, ElementRef } from '@angular/core';
import * as firebase from 'firebase/app';

import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

/**
* @namespace FirebasePhoneAuthService
* @method createRecaptcha   - create the recapcha box element
* @method removeRecaptcha   - delete the recapcha box element
* @method sendLoginCode     - request a phone number verification code
* @method verifyLoginCode   - authenticate the verification code
* @method subscribe         - observable subscribe auth method data callbacks
*/

@Injectable()
export class FirebasePhoneAuthService {

    private _handler = new Subject<any>();
    private _recaptchaElement : ElementRef;
    private _confirmationResult : any;

    constructor(){}

    /**
     * observable subscribe auth method data callbacks
     * @example phoneAuth.subscribe( (e) => console.log(e));
     * @method subscribe
     * @param { Function } - callbacks method
     */
    subscribe = (callback: any): Subscription => this._handler.subscribe(callback);

    /**
     * create the recapcha box element
     * @example phoneAuth.createRecaptcha(element : ElementRef);
     * @method createRecaptcha
     * @param { ElementRef } - element bind
     * @return { Object } - firebase recaptchaVerifier box
     */
    createRecaptcha(elementRef : ElementRef) : any{

        let element = document.createElement('div');
        element.id = 'recaptcha-container';
        elementRef.nativeElement.appendChild(element);
        
        this._recaptchaElement = elementRef;

        return new firebase.auth.RecaptchaVerifier('recaptcha-container');
    }

    /**
     * delete the recapcha box element
     * @example phoneAuth.removeRecaptcha();
     * @method removeRecaptcha
     */
    removeRecaptcha() : void {
        this._recaptchaElement.nativeElement.remove();
    }

    /**
     * request a phone number verification code
     * @example phoneAuth.sendLoginCode(phone : string, this.recaptchaVerifier)
     * @method sendLoginCode
     * @param { String } - phone number
     * @param { Object } - recapcha object
     */
    sendLoginCode(phone : string, appVerifier : any ) : void {
        
        firebase.auth().signInWithPhoneNumber(phone, appVerifier).then(e => {
            
            this._confirmationResult = e;
            
            this._handler.next({
                type : 'sendLoginCode',
                confirmationResult : e
            });

        })
        .catch( error => console.error(error));
    }

    /**
     * authenticate the verification code
     * @example phoneAuth.verifyLoginCode(verificationCode : string)
     * @method verifyLoginCode
     * @param { String } - verification code
     */
    verifyLoginCode(code : string) : void {

        this._confirmationResult.confirm(code).then(e =>{
            
            this._handler.next({
                type : 'verifyLoginCode',
                verificationData : e
            });

        }).catch( error => console.error(error));
    }

}
```

---

## Examples

`app.component.ts`

```ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';

import { FirebasePhoneAuthService } from './providers/firebase-phone-auth.service';

export class AppComponent implements OnInit {
    
    @ViewChild('recaptchaElement')
    private recaptchaElement : ElementRef;
    
    public recaptchaVerifier : any;
    public subscription      : Subscription;

    constructor(private firebaseAuth: AngularFireAuth, public phoneAuth : FirebasePhoneAuthService) {
        this.subscription = this.phoneAuth.subscribe( (e) => console.log(e));
    }

    ngOnInit() {
        this.recaptchaVerifier = this.phoneAuth.createRecaptcha(this.recaptchaElement);
    }

    /* 
        subscribe callbacks
    
        { type : 'sendLoginCode', confirmationResult : e }
        { type : 'verifyLoginCode', verificationData : e }
    */    
}
```

`app.component.html`

```html
<div #recaptchaElement></div>

<button (click)="phoneAuth.removeRecaptcha()">

<button (click)="phoneAuth.sendLoginCode('+82010-1234-1234', recaptchaVerifier)">

<button (click)="phoneAuth.verifyLoginCode('123456')">

<button (click)="subscription.unsubscribe()">
```

> Support for PhoneNumber Auth #990
> - https://github.com/angular/angularfire2/issues/990