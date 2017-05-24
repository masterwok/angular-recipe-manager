import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeSearchComponent} from './recipe-search/recipe-search.component';
import {RecipesComponent} from './recipes.component';
import {RouterModule} from '@angular/router';
import {RecipeListComponent} from './recipe-search/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-search/recipe-list/recipe-item/recipe-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CanDeactivateRecipeEditService} from './services/can-deactivate-recipe-edit.service';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from '../services/auth-guard.service';
import {RecipeRemoveModalComponent} from './recipe-remove-modal/recipe-remove-modal.component';


const routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: RecipesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RecipeSearchComponent
      },
      {
        path: 'edit',
        loadChildren: './recipe-edit/recipe-edit.module#RecipeEditModule'
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
      },
    ]
  }
];


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    // Components
    RecipesComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeSearchComponent,
    RecipeDetailComponent,
    RecipeRemoveModalComponent
  ],
  providers: [
    // Services
    CanDeactivateRecipeEditService
  ]
})
export class RecipesModule {
}
