import { FormatUtils } from './format-utils';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'largeNumber'
})
export class LargeNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (isNaN(value)) {
      const v = FormatUtils.formatMoney(FormatUtils.parseMoney(value));
      return this.format(v);
    } else {
      const v = FormatUtils.formatMoney(value);
      return this.format(v);
    }
  }

  format(num) {
    const parts = num.split('.');
    // tslint:disable-next-line:max-line-length
    return parts.length > 1 ? (Math.trunc(parseInt(parts.join(''), 10) / Math.pow(1000, parts.length - 1)) + ',' + parts[1].substring(0, 1) + '' + ['mil', 'm', 'b'][parts.length - 2]) : parts[0];
  }
}
