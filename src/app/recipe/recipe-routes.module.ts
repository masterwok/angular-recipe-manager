import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeSearchComponent} from './recipe-search/recipe-search.component';
import {AuthGuard} from '../core/services/auth-guard.service';
import {RecipeComponent} from './recipe.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: RecipeComponent,
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutesModule {

}
