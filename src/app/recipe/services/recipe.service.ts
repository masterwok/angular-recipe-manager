import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {database} from 'firebase';

import 'rxjs/Rx';
import {Recipe} from '../models/recipe.model';


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

  getRecipe(id: string) {
    // return new Promise((resolve, reject) => {
    return database().ref(`recipes/${id}`)
      .once('value')
      .then(snapshot => snapshot.val());
    // });
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
