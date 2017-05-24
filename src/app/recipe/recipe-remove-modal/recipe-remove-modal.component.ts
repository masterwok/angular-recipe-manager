import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-recipe-remove-modal',
  templateUrl: './recipe-remove-modal.component.html',
  styleUrls: ['./recipe-remove-modal.component.css']
})
export class RecipeRemoveModalComponent implements OnInit {
  @Input() removeAction: Function;

  constructor() { }

  ngOnInit() {
  }

  confirmed() {
    if(!this.removeAction) {
      return;
    }

    this.removeAction();
  }

}
