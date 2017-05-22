import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActionButtonsService} from "../../services/action-buttons.service";
import {ActionButton} from "../../action-buttons/models/action-button.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, AfterContentInit {

  constructor(private location: Location,
              private actionButtonService: ActionButtonsService) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.actionButtonService.setActionButtons([
      new ActionButton(
        'undo',
        'red waves-effect waves-light',
        () => this.location.back()
      ),
      new ActionButton(
        'save',
        'cyan waves-effect waves-light',
        () => this.location.back()
      )
    ])
    ;
  }
}
