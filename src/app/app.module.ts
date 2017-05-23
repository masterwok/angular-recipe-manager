import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {RecipeService} from './services/recipe.service';
import {
  FooterActionButtonsComponent
} from './footer-action-buttons/footer-action-buttons.component';
import {ActionButtonsService} from './services/action-buttons.service';
import {RecipesModule} from './recipes/recipes.module';
import {SharedModule} from './shared/shared.module';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recipes'
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
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
    FooterActionButtonsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RecipesModule,
    SharedModule,
    ReactiveFormsModule,
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
