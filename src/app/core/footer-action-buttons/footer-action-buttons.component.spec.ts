import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import createSpy = jasmine.createSpy;
import Spy = jasmine.Spy;
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {FooterActionButtonsComponent} from './footer-action-buttons.component';
import {ActionButtonsService} from '../services/action-buttons.service';
import {Subject} from 'rxjs/Subject';
import {ActionButton} from './models/action-button.model';
import {Observable} from 'rxjs/Observable';


class RouterStub {
  events = Observable.create(observer => {
    observer.next(null);
  });

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

const testActionButtons = [
  new ActionButton('derp', 'cyan', 'tip1', null),
  new ActionButton('slurp', 'green', 'tip2', null),
  new ActionButton('burp', 'purple', 'tip3', null)
];

class ActionButtonsServiceStub {
  private actionButtons: ActionButton[];

  actionButtonSubject: Subject<ActionButton[]> = new Subject<ActionButton[]>();

  getActionButtons(): ActionButton[] {
    return testActionButtons;
  }

  setActionButtons(actionButtons: ActionButton[]) {
    this.actionButtons = actionButtons;
    this.actionButtonSubject.next(actionButtons);
  }
}


describe('FooterActionButtonsComponent', () => {

  let fixture: ComponentFixture<FooterActionButtonsComponent>;
  let component: FooterActionButtonsComponent;
  let debugElement: DebugElement;


  beforeEach(() => {
    TestBed
      .configureTestingModule({
        declarations: [FooterActionButtonsComponent],
        imports: [
          SharedModule,
          ReactiveFormsModule
        ],
        providers: [
          {provide: AuthService, useClass: AuthServiceStub},
          {provide: ActionButtonsService, useClass: ActionButtonsServiceStub},
          {provide: Router, useClass: RouterStub}
        ]
      });

    fixture = TestBed.createComponent(FooterActionButtonsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it(`getActionButtons() should return correct action buttons`, () => {
    fixture.detectChanges();

    testActionButtons.forEach((button, index) => {
      expect(button.color).toBe(component.actionButtons[index].color);
      expect(button.icon).toBe(component.actionButtons[index].icon);
      expect(button.tip).toBe(component.actionButtons[index].tip);
    });
  });

  it(`setActionButtons() should notify observers with correct buttons`, () => {
    fixture.detectChanges();

    const buttonService = debugElement.injector.get(ActionButtonsService);
    const tmp = [new ActionButton('asdf', 'qwer', '123', null)];

    buttonService.actionButtonSubject.subscribe(() => {
      tmp.forEach((button, index) => {
        expect(button.color).toBe(component.actionButtons[index].color);
        expect(button.icon).toBe(component.actionButtons[index].icon);
        expect(button.tip).toBe(component.actionButtons[index].tip);
      });
    });

    buttonService.setActionButtons(tmp);
  });


  it(`onClick() should invoke button action`, () => {
    let wasCalled = false;

    const tmp = new ActionButton('asdf', 'qwer', '123', () => {
      wasCalled = true;
    });

    component.onClick(tmp);

    expect(wasCalled).toBe(true);
  });

});
