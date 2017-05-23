import {Component, OnInit} from '@angular/core';
import {ActionButtonsService} from '../services/action-buttons.service';
import {ActionButton} from './models/action-button.model';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './footer-action-buttons.component.html',
  styleUrls: ['./footer-action-buttons.component.css']
})
export class FooterActionButtonsComponent implements OnInit {
  public actionButtons: ActionButton[];

  constructor(private actionButtonService: ActionButtonsService,
              private router: Router) {
    this.onClick = this.onClick.bind(this);
  }

  ngOnInit() {
    this.actionButtons = this.actionButtonService.getActionButtons();

    this.actionButtonService.actionButtonSubject.subscribe(buttons => {
      this.actionButtons = buttons;
    });

    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }

      window['jQuery']('.tooltipped').tooltip('remove');
    });
  }


  onClick(actionButton: ActionButton) {
    actionButton.action();
  }

}
