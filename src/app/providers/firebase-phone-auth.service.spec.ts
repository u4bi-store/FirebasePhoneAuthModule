import { TestBed, inject } from '@angular/core/testing';

import { FirebasePhoneAuthService } from './firebase-phone-auth.service';

describe('FirebasePhoneAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebasePhoneAuthService]
    });
  });

  it('should be created', inject([FirebasePhoneAuthService], (service: FirebasePhoneAuthService) => {
    expect(service).toBeTruthy();
  }));
});
