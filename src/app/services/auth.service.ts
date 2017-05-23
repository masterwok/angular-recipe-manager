import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private token: string;

  get isAuthenticated(): boolean {
    return auth().currentUser != null;
  }

  constructor(private router: Router) {
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
      .getToken()
      .then(token => this.token = token);

    return this.token;
  }

}
