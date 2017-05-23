import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {RecipeService} from './services/recipe.service';
import {ActionButtonsComponent} from './action-buttons/action-buttons.component';
import {ActionButtonsService} from './services/action-buttons.service';
import {RecipesModule} from "./recipes/recipes.module";
import { ActionButtonComponent } from './action-buttons/action-button/action-button.component';


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
    ActionButtonsComponent,
    ActionButtonComponent
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
