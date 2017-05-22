import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RouterModule, Routes} from "@angular/router";
import {RecipeListComponent} from './recipes/recipe-search/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipes/recipe-search/recipe-list/recipe-item/recipe-item.component';
import {RecipeService} from "./services/recipe.service";
import {Recipe} from "./recipes/models/recipe.model";
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeSearchComponent} from './recipes/recipe-search/recipe-search.component';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import {ActionButtonsService} from "./services/action-buttons.service";

const appRoutes: Routes = [
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
        path: ':id',
        component: RecipeDetailComponent
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recipes'
  },
  {
    path: '**',
    redirectTo: '/recipes'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeSearchComponent,
    ActionButtonsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RecipeService,
    ActionButtonsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
