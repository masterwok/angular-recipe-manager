import {PreloadAllModules, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './core/login/login.component';
import {AuthGuard} from './core/services/auth-guard.service';


const routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes'
  },
  {
    path: 'recipes',
    loadChildren: './recipe/recipe.module#RecipeModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
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
  imports: [
    RouterModule.forRoot(routes, {
      // We want to preload lazy loaded modules
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutesModule {

}
