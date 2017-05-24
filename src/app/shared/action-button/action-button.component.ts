import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input,
  Output, ViewChild
} from '@angular/core';

import * as $ from 'jquery';


@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements AfterViewInit, AfterViewInit {

  @ViewChild('actionButton') button: ElementRef;
  @Input() tip: string;
  @Input() removeTipAfterClick = true;
  @Input() position: string;
  @Input() icon: string;
  @Input() classes: string;
  @Input() pulse: boolean;

  @Output('action') action = new EventEmitter<any>();

  constructor() {
  }

  onClick() {
    if (this.removeTipAfterClick) {
      $(this.button.nativeElement).tooltip('remove');
    }

    this.action.emit(null);
  }

  ngAfterViewInit(): void {
    $(this.button.nativeElement).tooltip();
  }
}
