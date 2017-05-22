import {Component, ViewEncapsulation} from '@angular/core';
import '../../node_modules/materialize-css/dist/js/materialize.js';
import '../../node_modules/materialize-css/js/materialbox.js';


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
  title = `Mom's Recipes`
}
