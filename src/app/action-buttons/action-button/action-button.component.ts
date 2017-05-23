import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {ActionButton} from "../models/action-button.model";

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements AfterViewInit {
  @Input() actionButton: ActionButton;
  @Output('action') action = new EventEmitter<any>();

  constructor() {
  }

  ngAfterViewInit(): void {
    window['jQuery']('.tooltipped').tooltip();
  }

}
