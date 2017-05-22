import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActionButtonsService} from "../../services/action-buttons.service";
import {ActionButton} from "../../action-buttons/models/action-button.model";

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit, AfterContentInit {

  constructor(private actionButtonSerivce: ActionButtonsService) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.actionButtonSerivce.setActionButtons([
        new ActionButton(
          'add',
          'green',
          () => console.log('derp')
        )
    ]);
  }

}
