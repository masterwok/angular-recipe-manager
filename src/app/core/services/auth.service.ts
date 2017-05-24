import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class AuthService {
  public authObservable: Observable<boolean>;

  private token: string;

  get isAuthenticated(): boolean {
    return auth().currentUser != null;
  }

  constructor(private router: Router) {

    this.authObservable = Observable.create(observer => {
      auth().onAuthStateChanged(state => observer.next(state != null));
    });
  }

  public signIn(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email, password)
      .then((user) => this.getToken());
  }

  public signOut() {
    auth().signOut().then((result) => this.router.navigate(['/login']));
  }

  /**
   * This method fetches the current user's token. It could return null.
   * @returns {any}
   */
  getToken() {

    if (!this.isAuthenticated) {
      return null;
    }

    auth().currentUser
      .getIdToken()
      .then(token => this.token = token);

    return this.token;
  }

}
