import { join } from 'node:path';
import { Pipe, PipeTransform } from '@angular/core';
import { STRING_TYPE } from '@angular/compiler';

@Pipe({
  name: 'termText',
  standalone: true
})
export class TermTextPipe implements PipeTransform {
 
    transform(Text: string , limit: number):string{
      return  Text.split(" ", limit).join('');

    }
     
  }

 
