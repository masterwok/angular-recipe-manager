import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import {LoginComponent} from './login.component';
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {CustomSpinnerComponent} from '../../shared/custom-spinner/custom-spinner.component';
import {SharedModule} from '../../shared/shared.module';

class RouterStub {
  navigate(url: string) {
    return url;
  }
}

class AuthServiceStub {
  signOut() {
  }

  get isAuthenticated(): boolean {
    return false;
  }

  public signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}


describe('LoginComponent', () => {

  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let debugElement: DebugElement;


  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [LoginComponent,],
        imports: [
          SharedModule,
          ReactiveFormsModule
        ],
        providers: [
          {provide: AuthService, useClass: AuthServiceStub},
          {provide: Router, useClass: RouterStub}
        ]
      });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it(`Email should be invalid when empty`, () => {
    fixture.detectChanges();

    const emailControl = component.loginFormGroup.get('email');

    expect(emailControl.valid).toBe(false);
  });

  it(`Email should be valid when set to a valid email`, () => {
    fixture.detectChanges();

    const emailControl = component.loginFormGroup.get('email');

    emailControl.setValue('test@asdf.com');

    fixture.detectChanges();

    expect(emailControl.valid).toBe(true);
  });

  it(`Password should be invalid when empty`, () => {
    fixture.detectChanges();

    const passwordControl = component.loginFormGroup.get('password');

    expect(passwordControl.valid).toBe(false);
  });

  it(`Password should be valid when set to some value`, () => {
    fixture.detectChanges();

    const passwordControl = component.loginFormGroup.get('password');

    passwordControl.setValue('derp');

    fixture.detectChanges();

    expect(passwordControl.valid).toBe(true);
  });


  it('should set error message when trying to submit an invalid form', () => {
    fixture.detectChanges();

    component.onSubmit();

    expect(component.errorMessage.length).toBeGreaterThan(0);
  });

  it('should show spinner when authenticating', () => {
    fixture.detectChanges();

    component.loginFormGroup.reset({
      email: 'test@test.com',
      password: 'derp'
    });

    component.onSubmit();

    fixture.detectChanges();

    const spinner = debugElement.query(By.css('app-custom-spinner'));

    expect(spinner.nativeElement.hidden).toBeFalsy();
  });

  it('should hide form when authenticating', () => {
    fixture.detectChanges();

    component.loginFormGroup.reset({
      email: 'test@test.com',
      password: 'derp'
    });

    component.onSubmit();

    fixture.detectChanges();

    const form = debugElement.query(By.css('form'));

    expect(form.nativeElement.hidden).toBe(true);
  });

  it('should show form when authentication fails', () => {
    fixture.detectChanges();

    component.loginFormGroup.reset({
      email: 'test@test.com',
      password: 'derp'
    });

    const authService = debugElement.injector.get(AuthService);

    spyOn(authService, 'signIn').and.returnValue(new Promise((resolve, reject) => {
      reject(false);
    }));

    component.onSubmit().catch(() => {

      fixture.detectChanges();

      const form = debugElement.query(By.css('form'));

      expect(form.nativeElement.hidden).toBe(false);
    });
  });

  it('should hide spinner when authentication fails', () => {
    fixture.detectChanges();

    component.loginFormGroup.reset({
      email: 'test@test.com',
      password: 'derp'
    });

    const authService = debugElement.injector.get(AuthService);

    spyOn(authService, 'signIn').and.returnValue(new Promise((resolve, reject) => {
      reject(false);
    }));

    component.onSubmit().catch(() => {

      fixture.detectChanges();

      const spinner = debugElement.query(By.css('app-custom-spinner'));

      expect(spinner.nativeElement.hidden).toBe(true);
    });
  });
});
