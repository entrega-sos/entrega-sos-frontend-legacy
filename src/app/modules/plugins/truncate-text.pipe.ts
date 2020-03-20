import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: any, maxSize: number): any {
    if (!value || !maxSize) {
      return value;
    }

    let v: string = '';

    if (value) {
      v = String(value);
    }

    if (v.length > maxSize) {
      v = v.substr(0, maxSize) + '...';
    }

    return v;
  }

}
