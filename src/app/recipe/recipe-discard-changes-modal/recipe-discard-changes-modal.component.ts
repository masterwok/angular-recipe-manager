import {Component, Input, OnInit} from '@angular/core';

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
    this.discardModal = window['jQuery']('#discardChangesModal');
  }

  public show(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.discardModal.modal({
        dismissible: false,
        // This callback is used by Materialize; don't remove it.
        complete: (modal) => resolve(this.discard)
      });

      this.discardModal.modal('open');
    });
  }

}
