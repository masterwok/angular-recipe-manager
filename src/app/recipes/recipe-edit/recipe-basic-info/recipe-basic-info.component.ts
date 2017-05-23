import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../models/recipe.model';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recipe-basic-info',
  templateUrl: './recipe-basic-info.component.html',
  styleUrls: ['./recipe-basic-info.component.css']
})
export class RecipeBasicInfoComponent implements OnInit {
  @Input() recipeFormGroup: FormGroup;
  @Input() recipe: Recipe;

  constructor() {
  }

  ngOnInit() {
    this.recipeFormGroup.patchValue({
      'name': this.recipe.name,
      'description': this.recipe.description
    });
  }

}
