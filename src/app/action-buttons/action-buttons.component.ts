import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {ActionButtonsService} from '../services/action-buttons.service';
import {ActionButton} from './models/action-button.model';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit, AfterViewChecked {
  public actionButtons: ActionButton[];
  private updateTooltips: boolean;

  constructor(private actionButtonService: ActionButtonsService) {
  }

  ngAfterViewChecked(): void {
    if (!this.updateTooltips) {
      return;
    }

    this.updateTooltips = false;
    window['jQuery']('.tooltipped').tooltip();
  }

  ngOnInit() {
    this.actionButtons = this.actionButtonService.getActionButtons();

    this.actionButtonService.actionButtonSubject.subscribe(buttons => {
      this.actionButtons = buttons;
      this.updateTooltips = true;
    });
  }


  onClick(actionButton: ActionButton) {
    window['jQuery']('.tooltipped').tooltip('remove');
    actionButton.action();
  }


}
