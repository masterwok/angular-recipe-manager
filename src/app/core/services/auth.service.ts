import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

/**
 * This class handles all authentication within the application.
 */
@Injectable()
export class AuthService {

  /**
   * Subscribe to this observable to be notified of authentication
   * change events.
   */
  public authObservable: Observable<boolean>;

  private token: string;

  /**
   * Check if the current is is authenticated.
   * @returns {boolean} Whether or not the user is authenticated.
   */
  get isAuthenticated(): boolean {
    return auth().currentUser != null;
  }

  constructor(private router: Router) {
    this.authObservable = Observable.create(observer => {
      auth().onAuthStateChanged(state => observer.next(state != null));
    });
  }

  /**
   * Sign the current user into Google Firebase.
   * @param email The email of the user.
   * @param password The password of the user.
   * @returns {firebase.Promise<any>} Promise of Firebase authentication.
   */
  public signIn(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email, password)
      .then((user) => this.getToken());
  }

  /**
   * Sign the current user out of Google Firebase and
   * redirect the user to the login page.
   */
  public signOut() {
    auth().signOut().then((result) => this.router.navigate(['/login']));
  }

  /**
   * This method fetches the current user's token.
   * @returns {any} The user's token. This value could be null.
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
