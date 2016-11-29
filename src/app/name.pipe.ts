import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namePipe'
})
export class NamePipe implements PipeTransform {

  transform(value: any, args: any): any {
    let name = args;
    return value.filter(item => {
      return item.name == name;
    })
  }
}
