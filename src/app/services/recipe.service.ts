import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/models/recipe.model';
import {Subject} from 'rxjs/Subject';
import {database} from 'firebase';

import 'rxjs/Rx';


@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];
  private databaseRef = database().ref('recipes');

  get hasData(): boolean {
    return this.recipes.length > 0;
  }

  public recipesUpdated: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor() {

    // Listen for database value changes
    this.databaseRef.on('value', (response) => {
      // Firebase returns an object not an array
      const recipes = (<any>Object).values(response.val());

      this.recipes = recipes;

      this.recipesUpdated.next(this.recipes ? this.recipes.slice() : []);
    });
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: string): Recipe {
    const recipe = this.recipes.find(r => r.id === id);

    if (!recipe) {
      return null;
    }

    return Object.assign({}, recipe);
  }

  createRecipe(recipe: Recipe) {
    const entry = this.databaseRef.push();

    recipe = Object.assign({}, recipe, {
      id: entry.key
    });

    entry.set(recipe);

    return recipe;
  }

  removeRecipe(id: string) {
    const removeUpdate = {};
    removeUpdate[id] = null
    this.databaseRef.update(removeUpdate);
  }

  updateRecipe(recipe: Recipe) {
    const updates = {};
    updates[recipe.id] = recipe;
    this.databaseRef.update(updates);
  }

  query(query: string) {

    if (query.length === 0) {
      return this.recipesUpdated.next(this.recipes);
    }

    const regex = new RegExp(query, 'i');
    const queryResults = [];

    this.recipes.forEach(r => {
      if (r.name.search(regex) !== -1) {
        queryResults.push(r);
      }
    });

    this.recipesUpdated.next(queryResults);
  }

}
