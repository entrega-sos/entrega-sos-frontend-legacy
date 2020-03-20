import { SelectGroupOption } from './select-group/select-group-option';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'groupFilter'
})
export class SelectGroupFilterPipe implements PipeTransform {
    transform(options: SelectGroupOption[], groupFilter: string): any {
        let result = options.filter(option => option.group == groupFilter);
        return result;
    }
}
