import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'padding'
})
export class PaddingPipe implements PipeTransform {

    transform(value: any, padWith: string, padSize: number): any {

        if (!padWith || !padSize) {
            console.warn('padWith e padSize não definidos!');
            return value;
        }

        let v: string = '';

        if (value) {
            v = String(value);
        }

        // Se o tamanho já for maior ou igual, retorna a propria string.
        if (padSize >= v.length) {
            let max = padSize - v.length;

            while (v.length < padSize) {
                v = padWith + v;
            }
        }
        return v;
    }
}
