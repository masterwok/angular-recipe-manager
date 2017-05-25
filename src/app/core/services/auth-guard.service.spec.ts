import {AuthGuard} from './auth-guard.service';
import {inject, TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';


class RouterStub {
  navigate(url: string) {
    return url;
  }
}

class AuthServiceStub {

  public authObservable = Observable.create(observer => {
    observer.next(this.isAuthenticated);
  });

  get isAuthenticated(): boolean {
    return false;
  }

  public signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}


describe('AuthGuard', () => {
  let authGuard: AuthGuard = null;

  // Need to configure the guard dependencies
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: Router, useClass: RouterStub}
      ]
    });
  });

  // Need to inject the created guard
  beforeEach(inject([AuthGuard], (authGuardService: AuthGuard) => {
    authGuard = authGuardService;
  }));

  it('should not be able to activate when not authenticated', () => {
    (<Observable<boolean>>authGuard.canActivate(null, null))
      .subscribe(canActivate => {
        expect(canActivate).toBe(false);
      });
  });

  it('should be able to activate when authenticated', () => {
    const authService = TestBed.get(AuthService);

    spyOnProperty(authService, 'isAuthenticated', 'get').and.returnValue(true);

    (<Observable<boolean>>authGuard.canActivate(null, null))
      .subscribe(canActivate => {
        expect(canActivate).toBe(true);
      });
  });

  it('should not be able to load when not authenticated', () => {
    (<Promise<boolean>>authGuard.canLoad(null))
      .then(canLoad => {
        expect(canLoad).toBe(false);
      });
  });

  it('should be able to load when authenticated', () => {
    const authService = TestBed.get(AuthService);

    spyOnProperty(authService, 'isAuthenticated', 'get').and.returnValue(true);

    (<Promise<boolean>>authGuard.canLoad(null))
      .then(canLoad => {
        expect(canLoad).toBe(true);
      });
  });

});




