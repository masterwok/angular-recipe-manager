import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Recipe} from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-image',
  templateUrl: './recipe-image.component.html',
  styleUrls: ['./recipe-image.component.css']
})
export class RecipeImageComponent implements OnInit {
  @Input() recipeFormGroup: FormGroup;
  @Input() recipe: Recipe;

  public imagePath: string;

  constructor() {
  }

  ngOnInit() {
    this.imagePath = this.recipe.imagePath;
  }

}
