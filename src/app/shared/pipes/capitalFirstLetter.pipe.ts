import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalFirstLetter',
})
export class CapitalFirstLetterPipe implements PipeTransform {
  constructor() {}

  transform(name: any, args?: any): any {
    let result = name;
    if (typeof name !== 'string') {
      result = name.toString();
    }
    const lowerCaseStr = result.substring(1).toLowerCase();
    const firstLetter = result.charAt(0).toUpperCase();
    return firstLetter + lowerCaseStr;
  }
}
