import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../models/ingredient.model';
import {Recipe} from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-ingredients-list',
  templateUrl: './recipe-ingredients-list.component.html',
  styleUrls: ['./recipe-ingredients-list.component.css']
})
export class RecipeIngredientsListComponent implements OnInit {
  @Input() recipeFormGroup: FormGroup;
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {
    if (!this.recipe) {
      return;
    }

    this.recipe.ingredients.forEach(i => {
      this.addIngredient(this.createIngredientFormGroup(i));
    });
  }

  get noIngredients(): boolean {
    return (<FormArray>this.recipeFormGroup.get('ingredients')).controls.length === 0;
  }

  addIngredient(ingredient: FormGroup) {
    const formArray = <FormArray>this.recipeFormGroup.get('ingredients');
    formArray.push(ingredient ? ingredient : this.createIngredientFormGroup());
  }

  removeIngredient(control: FormControl) {
    const formArray = (<FormArray>this.recipeFormGroup.get('ingredients'));
    const controlIndex = formArray.controls.indexOf(control);

    formArray.removeAt(controlIndex);
  }

  private createIngredientFormGroup(ingredient?: Ingredient): FormGroup {
    return new FormGroup({
      'ingredientName': new FormControl(
        ingredient ? ingredient.name : null,
        [Validators.required]
      ),
      'ingredientAmount': new FormControl(
        ingredient ? ingredient.amount : null,
        [Validators.required]
      )
    });
  }
}
