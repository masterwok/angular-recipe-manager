import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

/**
 * Login form component used for authentication.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public isAuthenticated: boolean;
  public isAuthenticating: boolean;
  public errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router) {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  /**
   * Submit the form and attempt to sign the user into the application.
   * @returns {firebase.Thenable<any>} Promise of authentication result.
   */
  onSubmit() {

    if (!this.loginFormGroup.valid) {
      this.errorMessage = 'Valid email and password required.';
      return;
    }

    this.isAuthenticating = true;
    this.errorMessage = null;

    const value = this.loginFormGroup.value;

    return this.signIn(value.email, value.password);
  }

  /**
   * Sign the user into the application.
   * @param email Email Address
   * @param password Password
   * @returns {firebase.Thenable<any>} AuthService promise.
   */
  private signIn(email: string, password: string) {
    return this.authService.signIn(email, password)
      .then(() => {
        this.isAuthenticating = false;
        this.router.navigate(['/recipes']);
      })
      .catch(error => {
        this.isAuthenticating = false;
        this.errorMessage = error.message;
      });
  }

}
