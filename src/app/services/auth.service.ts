import {Injectable} from '@angular/core';
import {auth} from 'firebase';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  get isAuthenticated(): boolean {
    return auth().currentUser != null;
  }

  constructor(private router: Router) {
  }

  public signIn(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email,  password);
  }

  public signOut() {
    auth().signOut().then((result) => this.router.navigate(['/login']));
  }

}
