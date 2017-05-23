import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RouterModule, Routes} from '@angular/router';
import {RecipeListComponent} from './recipes/recipe-search/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipes/recipe-search/recipe-list/recipe-item/recipe-item.component';
import {RecipeService} from './services/recipe.service';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeSearchComponent} from './recipes/recipe-search/recipe-search.component';
import {ActionButtonsComponent} from './action-buttons/action-buttons.component';
import {ActionButtonsService} from './services/action-buttons.service';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipeRemoveModalComponent} from './recipes/recipe-remove-modal/recipe-remove-modal.component';
import {RecipesModule} from "./recipes/recipes.module";


const appRoutes: Routes = [
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
    ActionButtonsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RecipesModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    RecipeService,
    ActionButtonsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
