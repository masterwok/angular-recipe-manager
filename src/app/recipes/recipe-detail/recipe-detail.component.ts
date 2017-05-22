import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../models/recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {$} from 'jquery';
import {ActionButton} from "../../action-buttons/models/action-button.model";
import {ActionButtonsService} from "../../services/action-buttons.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, AfterContentInit {
  public recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private actionButtonSerivce: ActionButtonsService) {
  }

  ngOnInit() {

    // Need to initialize material box as this content is loaded dynamically
    window['jQuery']('.materialboxed').materialbox();

    this.route.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipe(+params.id);
    });
  }

  ngAfterContentInit(): void {
    this.actionButtonSerivce.setActionButtons([
      new ActionButton(
        'add',
        'green',
        () => console.log('derp')
      ),
      new ActionButton(
        'edit',
        'cyan',
        () => console.log('derp')
      ),
      new ActionButton(
        'delete',
        'red',
        () => console.log('derp')
      ),
    ]);
  }
}
