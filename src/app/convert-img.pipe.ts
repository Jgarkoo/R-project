import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertImg'
})
export class ConvertImgPipe implements PipeTransform {

  transform(value: string): string {
    return `data:image/png;base64,${value}`;
  }

}
  