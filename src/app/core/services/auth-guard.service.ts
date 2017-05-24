import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  private authObserverable: Observable<boolean>;

  constructor(private authSerivce: AuthService,
              private router: Router) {

    this.authObserverable = this.authSerivce.authObservable;

    this.authObserverable.subscribe(isAuthenticated => {
      console.log(`Is authenticated ? ${isAuthenticated}`);

      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.authObserverable;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // Not sure why but this doesn't work unless wrapped in a promise o____O?
    return new Promise((resolve) => {
      this.authObserverable.subscribe(asdf => {
        resolve(asdf);
      });
    });
  }

}
