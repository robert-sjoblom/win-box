import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === NaN || value === undefined || value === ""){
      return "";
    }
    let sizeNr = Number(value)/1024;
    if(sizeNr > 1){
      if (sizeNr/1024 > 1){
        sizeNr = sizeNr/1024
        return `${sizeNr.toFixed(2)} MB`
      }
      return `${sizeNr.toFixed(2)} KB`
    } else{
      sizeNr = sizeNr*1024;
      return `${sizeNr} byte`
    }
  }
}
