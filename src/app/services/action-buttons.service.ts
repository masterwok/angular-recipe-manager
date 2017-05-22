import {Injectable} from '@angular/core';
import 'rxjs';
import {ActionButton} from '../action-buttons/models/action-button.model';
import {Subject} from 'rxjs/Subject';
import {NavigationStart, Router} from '@angular/router';


@Injectable()
export class ActionButtonsService {

  public actionButtonSubject: Subject<ActionButton[]> = new Subject<ActionButton[]>();

  private actionButtons: ActionButton[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.setActionButtons([]);
      }
    });
  }

  setActionButtons(actionButtons: ActionButton[]) {
    this.actionButtons = actionButtons;
    this.actionButtonSubject.next(this.getActionButtons());
  }

  getActionButtons(): ActionButton[] {
    return this.actionButtons.slice();
  }


}
