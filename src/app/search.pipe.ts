import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();

    // for array of array of objects // filter array in the items
    return items.filter(item => item.categoryId.map(function(r: any) {
      return r.name.toLowerCase();
    }).includes(searchText.toLowerCase()));
    // return items.filter(item => item.categoryId.map(function(r: any) {
    //   return r.name.toLowerCase().indexOf(searchText) > -1;
    // }));

    //for  array of object
    // return items.filter(it => {
    //   console.log("it", it)
    //   return it.categoryId.name.toString().toLowerCase().includes(searchText);
    // });
    // let filteredItems : any[] = new Array();
    // if (searchText != undefined) {
    //   // filter items array, items which match and return true will be kept, false will be filtered out
    //     items.forEach((card)={
    //         card.forEach((item)=> {
    //             let temp= item.categoryId.toLowerCase().includes(race.toLowerCase());
    //             if(temp){
    //                 filteredItems.push(card);
    //             }
    //         })
    //
    //     })
    //  return filteredItems;
  }

}
