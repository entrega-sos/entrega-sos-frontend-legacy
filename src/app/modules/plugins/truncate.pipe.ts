import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})

export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: number, trail: string): string {
        // const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
        // const trail = args.length > 1 ? args[1] : '...';
        if (!limit) {
            limit = 20;
        }

        if (!trail) {
            trail = '...';
        }

        if (!value) {
            value = '';
        }
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}
