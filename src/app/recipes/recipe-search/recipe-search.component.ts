import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActionButtonsService} from '../../services/action-buttons.service';
import {ActionButton} from '../../footer-action-buttons/models/action-button.model';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit, AfterContentInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private actionButtonService: ActionButtonsService) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.actionButtonService.setActionButtons([
        new ActionButton(
          'add',
          'green waves-effect waves-light',
          'Create',
          () => this.router.navigate(['edit'], {
            relativeTo: this.route
          })
        )
    ]);
  }

}
