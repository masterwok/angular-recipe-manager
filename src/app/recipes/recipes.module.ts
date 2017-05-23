import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeSearchComponent} from './recipe-search/recipe-search.component';
import {RecipesComponent} from './recipes.component';
import {RouterModule} from '@angular/router';
import {RecipeListComponent} from './recipe-search/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-search/recipe-list/recipe-item/recipe-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipeRemoveModalComponent} from './recipe-remove-modal/recipe-remove-modal.component';
import {CanDeactivateRecipeEditService} from './services/can-deactivate-recipe-edit.service';
import { RecipeDiscardChangesModalComponent } from './recipe-discard-changes-modal/recipe-discard-changes-modal.component';
import {SharedModule} from '../shared/shared.module';
import { RecipeImageComponent } from './recipe-edit/recipe-image/recipe-image.component';
import { RecipeIngredientsListComponent } from './recipe-edit/recipe-ingredients-list/recipe-ingredients-list.component';
import { RecipeBasicInfoComponent } from './recipe-edit/recipe-basic-info/recipe-basic-info.component';
import { RecipeDirectionsListComponent } from './recipe-edit/recipe-directions-list/recipe-directions-list.component';
import {AuthGuard} from '../services/auth-guard.service';

const routes = [
  {
    path: 'recipes',
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
        component: RecipeEditComponent,
        canDeactivate: [CanDeactivateRecipeEditService]
      },
      {
        path: ':id',
        component: RecipeDetailComponent
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canDeactivate: [CanDeactivateRecipeEditService]
      }
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
    RecipeRemoveModalComponent,
    RecipesComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeSearchComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeDiscardChangesModalComponent,
    RecipeImageComponent,
    RecipeIngredientsListComponent,
    RecipeBasicInfoComponent,
    RecipeDirectionsListComponent,
  ],
  providers: [
    // Services
    CanDeactivateRecipeEditService
  ]
})
export class RecipesModule {
}
