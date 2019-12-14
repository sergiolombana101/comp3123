import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(items:any, searchText:string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    return items.filter( function(item) {
      console.log(JSON.stringify(item))
      console.log("Items"+searchText)
      return JSON.stringify(item).includes(searchText)
    })
  }

}
