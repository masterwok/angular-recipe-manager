import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {HeaderComponent} from './header.component';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

class AuthServiceStub {
  signOut() {
  }

  get isAuthenticated(): boolean {
    return false;
  }
}


describe('HeaderComponent', () => {

  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let debugElement: DebugElement;


  // Create a new test bed for each test so the testing environment can reset itself.
  beforeEach(() => {

    // TestBed creates an Angular testing module (@NgModule) that can be configured
    // with the configureTestingModule method to produce the module environment for the class
    // you want to test. This is a *test bed* or container for the component under test.
    //
    // ConfigureTestingModule takes most of the properties associated with @NgModule
    TestBed
      .configureTestingModule({
        declarations: [HeaderComponent],
        providers: [
          {provide: AuthService, useClass: AuthServiceStub},
          {provide: Router, useClass: RouterStub}
        ]
      });

    // Create a component test fixture (test environment surrounding the created component)
    fixture = TestBed.createComponent(HeaderComponent);

    // Handle to the component test instance itself
    component = fixture.componentInstance;

    // Handle on the component's DOM
    debugElement = fixture.debugElement;

  });

  it(`Brand logo should read Mom's Recipes`, () => {
    fixture.detectChanges();

    // Can also use queryAll() to get an array of matching elements
    const brandLogo = debugElement.query(By.css('.brand-logo'));
    const ne = brandLogo.nativeElement;

    expect(ne.textContent).toContain(`Mom's Recipes`);
  });


  it(`Should show login link when not authenticated`, () => {
    fixture.detectChanges();

    // Can also use queryAll() to get an array of matching elements
    const loginLink = debugElement.query(By.css('#loginLink'));
    const ne = loginLink.nativeElement;

    expect(ne.textContent).toContain(`Login`);
  });

  it(`Should show recipes link when authenticated`, () => {

    const authService = debugElement.injector.get(AuthService);

    spyOnProperty(authService, 'isAuthenticated', 'get').and.returnValue(true);

    fixture.detectChanges();

    // Can also use queryAll() to get an array of matching elements
    const firstLink = debugElement.query(By.css('#recipesLink'));
    const ne = firstLink.nativeElement;

    expect(ne.textContent).toContain(`Recipes`);
  });

  it(`Should show logout link when authenticated`, () => {

    const authService = debugElement.injector.get(AuthService);

    spyOnProperty(authService, 'isAuthenticated', 'get').and.returnValue(true);

    fixture.detectChanges();

    const logoutLink = debugElement.query(By.css('#logoutLink'));
    const ne = logoutLink.nativeElement;

    expect(ne.textContent).toContain(`Logout`);
  });

});
