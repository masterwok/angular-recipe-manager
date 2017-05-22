import {Injectable} from '@angular/core';
import {Recipe} from '../recipes/models/recipe.model';
import {Subject} from 'rxjs/Subject';
import {Ingredient} from '../recipes/models/ingredient.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(0,
      'Drunken Noodles',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Uterque enim summo bono fruitur, id est voluptate. Neutrum vero, inquit ille. Illum mallem levares, quo optimum atque humanissimum virum, Cn. Luxuriam non reprehendit, modo sit vacua infinita cupiditate et timore.Such cheese',
      'http://farm4.static.flickr.com/3451/3198786366_05c66197c2.jpg',
      [
        new Ingredient('Basil', '10 Leaves'),
        new Ingredient('Chicken', '1 lb.')
      ],
      [
        'This is the first step',
        ' this is the second step',
        ' this is the third step'
      ]
    ),
    new Recipe(
      1,
      'Tom Kha Soup',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Uterque enim summo bono fruitur, id est voluptate. Neutrum vero, inquit ille. Illum mallem levares, quo optimum atque humanissimum virum, Cn. Luxuriam non reprehendit, modo sit vacua infinita cupiditate et timore.Such cheese',
      'http://daringgourmet.com/wp-content/uploads/2013/01/Tom-Kha-Gai-1-sm.jpg',
      [
        new Ingredient('Shrimp', '1 lb.'),
        new Ingredient('Coconut Milk', '12 oz.'),
        new Ingredient('Chili Oil', '3 Tbs'),
      ],
      [
        'This is the first step',
        ' this is the second step'
      ]
    ),
    new Recipe(
      2,
      'Sesame Chicken',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Uterque enim summo bono fruitur, id est voluptate. Neutrum vero, inquit ille. Illum mallem levares, quo optimum atque humanissimum virum, Cn. Luxuriam non reprehendit, modo sit vacua infinita cupiditate et timore.Such cheese',
      'http://www.seriouseats.com/recipes/assets_c/2014/05/20140513-food-lab-orange-chicken-sesame-chicken-15-thumb-625xauto-401022.jpg',
      [
        new Ingredient('Chicken', '1 lb.'),
        new Ingredient('Sesame Seeds', 'A bunch'),
        new Ingredient('Sesame Oil', '3 Tbs')
      ],
      [
        'This is the first step',
        ' this is the second step',
        ' this is the third step',
        ' this is the forth step'
      ]
    ),
    new Recipe(
      3,
      'French Onion Soup',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Uterque enim summo bono fruitur, id est voluptate. Neutrum vero, inquit ille. Illum mallem levares, quo optimum atque humanissimum virum, Cn. Luxuriam non reprehendit, modo sit vacua infinita cupiditate et timore.Such cheese',
      'http://cookdiary.net/wp-content/uploads/images/French_Onion_Soup_Crock_Pot_2800.jpg',
      [
        new Ingredient('Swiss Cheese', '10 Slices'),
        new Ingredient('Vidalia Onions', '6 Onions'),
        new Ingredient('Beef Stock', '2 Quarts'),
        new Ingredient('Sherry', '1/2 Cup')
      ],
      [
        'This is the first step',
        ' this is the second step',
        ' this is the third step',
        ' this is the forth step'
      ]
    )
  ];

  public recipesUpdated: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor() {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    const recipe = this.recipes.find(r => r.id === id);

    if (!recipe) {
      return null;
    }

    return Object.assign({}, recipe);
  }

  createRecipe(recipe: Recipe) {
    recipe = Object.assign({}, recipe, {
      id: Math.round(Math.random() * 99999999999)
    });

    this.recipes.push(recipe);

    this.recipesUpdated.next(this.getRecipes());

    return recipe;
  }

  removeRecipe(id: number) {
    const recipe = this.recipes.find(r => r.id === id);
    const index = this.recipes.indexOf(recipe);

    this.recipes.splice(index, 1);

    this.recipesUpdated.next(this.getRecipes());
  }

  updateRecipe(recipe: Recipe) {
    const entry = this.recipes.find(r => r.id === recipe.id);
    const index = this.recipes.indexOf(entry);

    this.recipes[index] = Object.assign({}, recipe);

    this.recipesUpdated.next(this.getRecipes());
  }

}
