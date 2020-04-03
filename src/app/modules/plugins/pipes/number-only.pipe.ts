import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberOnly'
})
export class NumberOnlyPipe implements PipeTransform {

  transform(value: string): string {
    return value ? value.replace(/\D/g, "") : "";
  }
}
