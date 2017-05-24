import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';


/**
 * The AuthGuard class is used to protect routes against users that are not authenticated.
 */
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  private authObserverable: Observable<boolean>;

  constructor(private authSerivce: AuthService,
              private router: Router) {

    this.authObserverable = this.authSerivce.authObservable;

    this.authObserverable.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Implementation of CanActivate interface.
   * @param route The activated route snapshot.
   * @param state The router state snapshopt.
   * @returns {Observable<boolean>} Observable returned from the auth services that
   * specifies whether or not the user is authenticated.
   */
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.authObserverable;
  }

  /**
   * Implmentation of CanLoad interface.
   * @param route The route.
   * @returns {Promise<T>} A promise that wraps the authentication observable.
   */
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // Not sure why but this doesn't work unless wrapped in a promise o____O?
    return new Promise((resolve) => this.authObserverable.subscribe(isAuthenticated => resolve(isAuthenticated)));
  }

}
