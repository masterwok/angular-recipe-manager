import {Component, OnInit} from '@angular/core';
import {ActionButtonsService} from '../services/action-buttons.service';
import {ActionButton} from './models/action-button.model';
import {NavigationStart, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

import * as $ from 'jquery';

/**
 * Action buttons component that sits at the bottom right of the page.
 */
@Component({
  selector: 'app-action-buttons',
  templateUrl: './footer-action-buttons.component.html',
  styleUrls: ['./footer-action-buttons.component.css']
})
export class FooterActionButtonsComponent implements OnInit {
  public actionButtons: ActionButton[];

  /**
   * Should only render when the user is authenticated.
   * @returns {boolean} Whether or not to render to component.
   */
  get shouldRender(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private actionButtonService: ActionButtonsService,
              private authService: AuthService,
              private router: Router) {
    this.onClick = this.onClick.bind(this);
  }

  ngOnInit() {
    this.actionButtons = this.actionButtonService.getActionButtons();

    this.actionButtonService.actionButtonSubject.subscribe(buttons => {
      this.actionButtons = buttons;
    });

    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationStart)) {
        return;
      }

      $('.tooltipped').tooltip('remove');
    });
  }


  /**
   * Execute action button action when the buttons is clicked.
   * @param actionButton The action button whose action should be invoked.
   */
  onClick(actionButton: ActionButton) {
    actionButton.action();
  }

}
