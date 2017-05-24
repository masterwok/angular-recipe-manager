import {Component, OnInit} from '@angular/core';
import {ActionButtonsService} from '../services/action-buttons.service';
import {ActionButton} from './models/action-button.model';
import {NavigationStart, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './footer-action-buttons.component.html',
  styleUrls: ['./footer-action-buttons.component.css']
})
export class FooterActionButtonsComponent implements OnInit {
  public actionButtons: ActionButton[];

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


  onClick(actionButton: ActionButton) {
    actionButton.action();
  }

}
