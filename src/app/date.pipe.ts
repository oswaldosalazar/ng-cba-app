import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args: any): any {
    let name = args;
    return value.filter(item => {
      return item.dateTime >= name;
    })
  }

}
