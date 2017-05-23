import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeSearchComponent} from "./recipe-search/recipe-search.component";
import {RecipesComponent} from "./recipes.component";
import {RouterModule} from "@angular/router";
import {RecipeListComponent} from "./recipe-search/recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-search/recipe-list/recipe-item/recipe-item.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipeRemoveModalComponent} from "./recipe-remove-modal/recipe-remove-modal.component";

const routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RecipeSearchComponent
      },
      {
        path: 'edit',
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent
      },
    ]
  }
];


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    RecipeRemoveModalComponent,
    RecipesComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeSearchComponent,
    RecipeDetailComponent,
    RecipeEditComponent
  ]
})
export class RecipesModule {
}
