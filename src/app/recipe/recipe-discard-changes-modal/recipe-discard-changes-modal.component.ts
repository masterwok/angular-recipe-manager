import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-recipe-discard-changes-modal',
  templateUrl: './recipe-discard-changes-modal.component.html',
  styleUrls: ['./recipe-discard-changes-modal.component.css']
})
export class RecipeDiscardChangesModalComponent implements OnInit {
  private discard: boolean;
  private discardModal;

  constructor() {
  }

  ngOnInit() {
    // Need to use jQuery to get reference to modal()
    this.discardModal = $('#discardChangesModal');
  }

  public show(): Promise<boolean> {
    return new Promise((resolve) => {

      this.discardModal.modal({
        dismissible: false,
        // This callback is used by Materialize; don't remove it.
        complete: (modal) => resolve(this.discard)
      });

      this.discardModal.modal('open');
    });
  }

}
