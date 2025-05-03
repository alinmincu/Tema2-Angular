import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'uppercaseDescription',
    standalone: true
})
export class UppercaseDescriptionPipe implements PipeTransform {
    transform(value: string): string {
        return value.toUpperCase();
    }
}