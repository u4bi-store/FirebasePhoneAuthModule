import { Component, OnInit } from '@angular/core';
import { FirebasePhoneAuthService } from './providers/firebase-phone-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  recaptchaVerifier : any;

  constructor(public authService: FirebasePhoneAuthService){}

  ngOnInit(){
      this.recaptchaVerifier = this.authService.createRecaptcha();
      this.recaptchaVerifier.render();
  }
}
