import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

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

  onSubmit() {
    this.isAuthenticating = true;
    this.errorMessage = null;

    if (!this.loginFormGroup.valid) {
      return;
    }

    const value = this.loginFormGroup.value;

    console.dir(value);

    this.authService.signIn(value.email, value.password)
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
