import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeSearchComponent} from './recipe-search/recipe-search.component';
import {RecipeListComponent} from './recipe-search/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-search/recipe-list/recipe-item/recipe-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CanDeactivateRecipeEditService} from './services/can-deactivate-recipe-edit.service';
import {SharedModule} from '../shared/shared.module';
import {RecipeRemoveModalComponent} from './recipe-remove-modal/recipe-remove-modal.component';
import {RecipeComponent} from './recipe.component';
import {RecipeRoutesModule} from './recipe-routes.module';



@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RecipeRoutesModule
  ],
  declarations: [
    // Components
    RecipeComponent,
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
export class RecipeModule {
}
