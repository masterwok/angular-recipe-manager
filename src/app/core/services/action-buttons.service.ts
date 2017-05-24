import {Injectable} from '@angular/core';
import {ActionButton} from '../footer-action-buttons/models/action-button.model';
import {Subject} from 'rxjs/Subject';

/**
 * This service is used by components to set the action buttons displayed in
 * the footer component. The only component that should need to subscribe to this
 * service is the footer action buttons component. Other components only need to
 * set the buttons they want displayed by calling setActionButtons(...) in their
 * NgAfterContentInit(0.
 */
@Injectable()
export class ActionButtonsService {

  /**
   * Subject that emits arrays of action buttons to be displayed. This should
   * only be subscribed to by the footer action buttons component.
   * @type {Subject<ActionButton[]>} The buttons to be shown in the footer component.
   */
  public actionButtonSubject: Subject<ActionButton[]> = new Subject<ActionButton[]>();

  private actionButtons: ActionButton[] = [];

  constructor() {
  }

  /**
   * Call this method to set the buttons displayed at the bottom of the page.
   * Generally, this is called in NgAfterContentInit() of the component being
   * navigated to.
   * @param actionButtons The action buttons to display.
   */
  setActionButtons(actionButtons: ActionButton[]) {
    this.actionButtons = actionButtons;
    this.actionButtonSubject.next(this.getActionButtons());
  }

  /**
   * Get the action buttons that are currently displayed in the footer component.
   * @returns {ActionButton[]}
   */
  getActionButtons(): ActionButton[] {
    return this.actionButtons.slice();
  }

}
