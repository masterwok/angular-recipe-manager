import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActionButtonsService} from '../../services/action-buttons.service';
import {ActionButton} from '../../footer-action-buttons/models/action-button.model';
import {Location} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../models/recipe.model';
import {RecipeService} from '../../services/recipe.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../models/ingredient.model';
import {RecipeDiscardChangesModalComponent} from '../recipe-discard-changes-modal/recipe-discard-changes-modal.component';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, AfterContentInit {

  @ViewChild('discardModal') discardModal: RecipeDiscardChangesModalComponent;

  public imagePath = `http://lorempixel.com/300/200/food/${Math.round(Math.random() * 10)}`;
  public recipeForm: FormGroup;
  public recipe: Recipe;
  private wasSaved: boolean;


  constructor(private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private actionButtonService: ActionButtonsService) {
  }

  ngOnInit() {

    // Need to initialize material box as this content is loaded dynamically
    window['jQuery']('.materialboxed').materialbox();

    this.recipeForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null),
      ingredients: new FormArray([]),
      steps: new FormArray([])
    });

    this.route.params.subscribe((params: Params) => {
      const id = +params['id'];

      this.recipe = this.recipeService.getRecipe(id);

      this.imagePath = this.recipe ? this.recipe.imagePath : this.imagePath;

      this.setFormGroup(this.recipe);
    });

  }

  ngAfterContentInit(): void {
    this.actionButtonService.setActionButtons([
      new ActionButton(
        'undo',
        'red waves-effect waves-light',
        'Discard',
        () => this.location.back()
      ),
      new ActionButton(
        'save',
        'cyan waves-effect waves-light',
        'Save',
        () => this.onSubmit()
      )
    ]);

  }

  /**
   * Used by the route guard to prevent deactivation of the route
   * when the form is dirty. If the form is dirty, then a confirmation
   * modal is displayed.
   *
   * @returns {any} - Returns a promise if the form is dirty and
   * a boolean of true if the form is clean. The discard modal
   * will return a promise that resolves based upon user action.
   */
  canDeactivate(): Promise<boolean> | boolean {
    const dirty = this.recipeForm.dirty;

    // Skip deactivation check if the form was already saved
    // or if the form is not dirty.
    if (!dirty || this.wasSaved) {
      return true;
    }

    return this.discardModal.show();
  }

  onSubmit() {
    const value = this.recipeForm.value;

    console.log(`Form is valid ? ${this.recipeForm.valid}`);

    const recipe = new Recipe(
      value.id,
      value.name,
      value.description,
      value.imagePath,
      [],
      []
    );


    value.ingredients.map(ingredient => {
      recipe.ingredients.push(new Ingredient(
        ingredient.ingredientName,
        ingredient.ingredientAmount)
      );
    });

    value.steps.map(control => recipe.steps.push(control.step));

    if (recipe.id) {
      this.recipeService.updateRecipe(recipe);
      this.wasSaved = true;
      this.router.navigate(['/recipes', recipe.id]);
    } else {
      this.recipeService.createRecipe(recipe);
      this.wasSaved = true;
      this.router.navigate(['/recipes']);
    }

  }

  private setFormGroup(recipe?: Recipe) {
    if (!recipe) {
      return;
    }

    this.recipeForm.reset({
      id: recipe.id,
    });
  }

}
