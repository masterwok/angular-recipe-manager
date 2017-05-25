import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionButtonComponent} from './action-button/action-button.component';
import { CustomSpinnerComponent } from './custom-spinner/custom-spinner.component';
import { BreakNewLinesComponent } from './break-new-lines/break-new-lines.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ActionButtonComponent,
    CustomSpinnerComponent,
    BreakNewLinesComponent
  ],
  exports: [
    ActionButtonComponent,
    CustomSpinnerComponent,
    BreakNewLinesComponent
  ]
})
export class SharedModule { }
