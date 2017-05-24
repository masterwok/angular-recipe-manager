import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {CanDeactivateRecipeEditService} from '../services/can-deactivate-recipe-edit.service';
import {RecipeDiscardChangesModalComponent} from '../recipe-discard-changes-modal/recipe-discard-changes-modal.component';
import {RecipeImageComponent} from './recipe-image/recipe-image.component';
import {RecipeBasicInfoComponent} from './recipe-basic-info/recipe-basic-info.component';
import {RecipeDirectionsListComponent} from './recipe-directions-list/recipe-directions-list.component';
import {RecipeIngredientsListComponent} from './recipe-ingredients-list/recipe-ingredients-list.component';
import {RecipeEditComponent} from './recipe-edit.component';


const routes = [
  {
    path: '',
    component: RecipeEditComponent,
    canDeactivate: [CanDeactivateRecipeEditService]
  },
  {
    path: ':id',
    component: RecipeEditComponent,
    canDeactivate: [CanDeactivateRecipeEditService]
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
    RecipeEditComponent,
    RecipeDiscardChangesModalComponent,
    RecipeImageComponent,
    RecipeIngredientsListComponent,
    RecipeBasicInfoComponent,
    RecipeDirectionsListComponent
  ],
  providers: [
    CanDeactivateRecipeEditService
  ]
})
export class RecipeEditModule {
}
