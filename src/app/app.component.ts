import {Component, ViewEncapsulation} from '@angular/core';
import '../../node_modules/materialize-css/dist/js/materialize.js';
import '../../node_modules/materialize-css/js/materialbox.js';
import {initializeApp} from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../../node_modules/materialize-css/dist/css/materialize.min.css',
    '../../node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff',
    './app.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = `Mom's Recipes`;

  constructor() {
    initializeApp({
      apiKey: 'AIzaSyCfDoWuPQqFpEX0ukmo3jbAX4MFoiM_LIo',
      authDomain: 'moms-recipes-f48a4.firebaseapp.com',
      databaseURL: 'https://moms-recipes-f48a4.firebaseio.com/'
    });
  }
}
