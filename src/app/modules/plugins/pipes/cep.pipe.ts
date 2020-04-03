import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: string): unknown {
    return `${value.substr(0, 2)}.${value.substr(2, 3)}-${value.substr(5, 3)}`;
  }
}