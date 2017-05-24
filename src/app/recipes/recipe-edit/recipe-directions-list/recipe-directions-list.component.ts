import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-directions-list',
  templateUrl: './recipe-directions-list.component.html',
  styleUrls: ['./recipe-directions-list.component.css']
})
export class RecipeDirectionsListComponent implements OnInit {
  @Input() recipeFormGroup: FormGroup;
  @Input() recipe: Recipe;

  get noSteps(): boolean {
    return (<FormArray>this.recipeFormGroup.get('steps')).controls.length === 0;
  }

  constructor() {
  }

  ngOnInit() {
    if (!this.recipe || !this.recipe.steps) {
      return;
    }

    this.recipe.steps.forEach(s => {
      this.addStep(this.createStepFormGroup(s));
    });
  }


  private createStepFormGroup(step?: string): FormGroup {
    return new FormGroup({
      'step': new FormControl(
        step ? step : null,
        [Validators.required]
      )
    });
  }

  addStep(step: FormGroup) {
    const formArray = <FormArray>this.recipeFormGroup.get('steps');
    formArray.push(step ? step : this.createStepFormGroup());

    if (!step) {
      this.recipeFormGroup.markAsDirty();
    }
  }

  removeStep(control: FormControl) {
    const formArray = (<FormArray>this.recipeFormGroup.get('steps'));
    const controlIndex = formArray.controls.indexOf(control);

    formArray.removeAt(controlIndex);

    this.recipeFormGroup.markAsDirty();
  }
}
