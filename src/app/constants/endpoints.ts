import {Injectable} from '@angular/core';

@Injectable()
export class Endpoints {
  public static readonly recipeEndpoint = '';
}

// Stashing this here while I build out the actual service.

//
// import {Injectable} from '@angular/core';
// import {Recipe} from '../recipes/models/recipe.model';
// import {Ingredient} from '../shopping/models/ingredient.model';
// import {Subject} from 'rxjs/Subject';
// import {Http, Response} from '@angular/http';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/Rx';
// import {AuthService} from './auth.service';
//
// @Injectable()
// export class RecipeService {
//   private recipeEndpoint = 'https://recipe-book-f37a1.firebaseio.com/recipes.json';
//
//   private recipes: Recipe[] = [];
//
//   public recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
//
//   constructor(private http: Http,
//               private authService: AuthService) {
//   }
//
//   getRecipes() {
//     return this.recipes.slice();
//   }
//
//   getRecipe(id: number): Recipe {
//     return this.recipes.find(r => r.id === id);
//   }
//
//   addRecipe(recipe: Recipe): Recipe {
//     this.recipes.push(recipe);
//     this.recipesChanged.next(this.getRecipes());
//     return recipe;
//   }
//
//   updateRecipe(id: number,
//                name: string,
//                description: string,
//                imagePath: string,
//                ingredients: Ingredient[]): Recipe {
//     const recipe = this.getRecipe(id);
//
//     recipe.name = name;
//     recipe.description = description;
//     recipe.imagePath = imagePath;
//     recipe.ingredients = ingredients;
//
//     this.recipesChanged.next(this.getRecipes());
//
//     return recipe;
//   }
//
//   removeRecipe(id: number) {
//     const recipe = this.recipes.find(r => r.id === id);
//     const index = this.recipes.indexOf(recipe);
//
//     this.recipes.splice(index, 1);
//
//     this.recipesChanged.next(this.getRecipes());
//   }
//
//   storeRecipes() {
//     console.log('trying to get save recipes');
//
//     const token = this.authService.getToken();
//
//     return this.http.put(`${this.recipeEndpoint}?auth=${token}`, this.recipes)
//       .map((response: Response) => response.json())
//       .catch((error) => {
//         console.log('An error occured while saving the recipes...');
//         return Observable.throw(error);
//       });
//   }
//
//   public fetchRecipes() {
//     console.log('trying to get recipes');
//
//     const token = this.authService.getToken();
//
//     const obserable = this.http.get(`${this.recipeEndpoint}?auth=${token}`)
//       .map((response: Response) => response.json())
//       .catch((error) => {
//         console.log('An error occured while fetching the recipes...');
//         return Observable.throw(error);
//       });
//
//     obserable.subscribe((recipes: Recipe[]) => {
//       this.recipes = recipes || [];
//       this.recipesChanged.next(this.getRecipes());
//     });
//
//     return obserable;
//   }
//
// }

