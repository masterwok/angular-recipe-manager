import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard.service';
import {ActionButtonsService} from './services/action-buttons.service';
import {HeaderComponent} from './header/header.component';
import {FooterActionButtonsComponent} from './footer-action-buttons/footer-action-buttons.component';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterActionButtonsComponent,
    LoginComponent
  ],
  declarations: [
    HeaderComponent,
    FooterActionButtonsComponent,
    LoginComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    ActionButtonsService
  ]
})
export class CoreModule {
}
