import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authSerivce: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkAuthServiceAndRedirectIfNeeded();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthServiceAndRedirectIfNeeded();
  }

  private checkAuthServiceAndRedirectIfNeeded(): boolean {
    if (this.authSerivce.isAuthenticated) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }


}
