import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'paragraphLineBreaks'
})
export class BreakNewLinesComponent implements PipeTransform {

  constructor() {
  }

  ngOnInit() {
  }

  transform(value: string): string {
    if(!value) {
      return value;
    }

    return value.replace('\n', '<br/><br/>');
  }

}
