import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionButtonComponent} from './action-button/action-button.component';
import { CustomSpinnerComponent } from './custom-spinner/custom-spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ActionButtonComponent,
    CustomSpinnerComponent
  ],
  exports: [
    ActionButtonComponent,
    CustomSpinnerComponent
  ]
})
export class SharedModule { }
