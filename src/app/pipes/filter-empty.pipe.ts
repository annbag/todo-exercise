import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterEmpty'
})
export class FilterEmptyPipe implements PipeTransform {

    transform(value: any[], ...args: any[]): any {
        if (!value) { return []; }
        return value.filter(item => item);
    }
}
