import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css']
})
export class ActionButtonComponent implements AfterViewInit {
  @Input() classes: string;
  @Input() tip: string;
  @Input() icon: string;

  @Output('action') action = new EventEmitter<any>();

  constructor() {
  }

  ngAfterViewInit(): void {
    window['jQuery']('.tooltipped').tooltip();
  }
}
