import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

/**
 * The navigation bar of the application.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /**
   * Check if user is authenticated with the server.
   * @returns {boolean} Whether or not the user is authenticated.
   */
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  /**
   * Sign the user out of the application.
   */
  public signOut() {
    this.authService.signOut();
  }

}
