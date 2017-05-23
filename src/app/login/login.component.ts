import {Component, OnInit} from '@angular/core';
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

    if (!this.loginFormGroup.valid) {
      return;
    }

    const value = this.loginFormGroup.value;

    console.dir(value);

    this.authService.signIn(value.email, value.password)
      .then(user => {
        this.router.navigate(['/recipes']);
      });

  }

}
