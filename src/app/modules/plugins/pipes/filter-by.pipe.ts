import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterByPipe implements PipeTransform {

  transform(value: any, filterValue: string, filterAttribute: string = ''): any {
    if (value && filterValue && filterValue.length > 0) {
      const array: any[] = value;

      if (!filterAttribute || filterAttribute == '') {
        return array.filter((s) => s ? s.toUpperCase().indexOf(filterValue.toUpperCase()) >= 0 : 0);
      } else {
        return array.filter((s) => s ? s[filterAttribute].toUpperCase().indexOf(filterValue.toUpperCase()) >= 0 : 0);
      }
    }
    return value;
  }

}
