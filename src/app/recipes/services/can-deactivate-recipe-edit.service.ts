import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {RecipeEditComponent} from "../recipe-edit/recipe-edit.component";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class CanDeactivateRecipeEditService implements CanDeactivate<RecipeEditComponent> {
  canDeactivate(component: RecipeEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return component.canDeactivate();
  }
}
