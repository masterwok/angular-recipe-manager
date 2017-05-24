import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActionButtonsService} from '../../core/services/action-buttons.service';
import {ActionButton} from '../../core/footer-action-buttons/models/action-button.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from "../models/recipe.model";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit, AfterContentInit {
  public recipes: Recipe[];
  public showSpinner = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private actionButtonService: ActionButtonsService) {
  }

  ngOnInit() {

    if(this.recipeService.hasData) {
      this.showSpinner = false;
      this.recipes = this.recipeService.getRecipes();
    }

    this.recipeService.recipesUpdated
      .subscribe(recipes => {
        this.showSpinner = false;
        this.recipes = recipes
      });
  }

  ngAfterContentInit(): void {
    this.actionButtonService.setActionButtons([
      new ActionButton(
        'add',
        'green waves-effect waves-light',
        'Create',
        () => this.router.navigate(['edit'], {
          relativeTo: this.route
        })
      )
    ]);
  }

  onQuery(event): void {
    this.showSpinner = true;
    this.recipeService.query(event.target.value);
  }

}
