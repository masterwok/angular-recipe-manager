import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-custom-spinner',
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.css']
})
export class CustomSpinnerComponent implements OnInit, OnChanges {

  @Input() spinnerColor: string;
  @ViewChild('spinner') spinner: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.updateBorderColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateBorderColor();
  }

  private updateBorderColor() {
    this.spinner.nativeElement.style.borderColor = this.spinnerColor;
  }
}
