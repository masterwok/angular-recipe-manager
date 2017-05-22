import {Component, OnInit} from '@angular/core';
import {ActionButtonsService} from '../services/action-buttons.service';
import {ActionButton} from './models/action-button.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit {

  public actionButtons: ActionButton[];

  constructor(private actionButtonService: ActionButtonsService,
              private router: Router) {
  }

  ngOnInit() {
    this.actionButtons = this.actionButtonService.getActionButtons();

    this.actionButtonService.actionButtonSubject.subscribe(buttons => {
      this.actionButtons = buttons;
    });
  }


  onClick(actionButton: ActionButton) {
    actionButton.action();
  }


}
