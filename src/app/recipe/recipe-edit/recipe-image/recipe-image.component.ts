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

  public imagePath = `http://lorempixel.com/300/200/food/${Math.round(Math.random() * 10)}`;

  constructor() {
  }

  ngOnInit() {
    if (!this.recipe) {
      return;
    }

    this.imagePath = this.recipe.imagePath;
  }

}
