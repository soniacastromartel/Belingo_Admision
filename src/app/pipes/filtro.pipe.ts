import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any [],
    // texto: string = '',
    args?: any
    ): any[] {


    if (!args) {
      return arreglo;
    }

    if (!arreglo){
      return arreglo;
    }

    args= args.toLowerCase();

    return arreglo.filter(
     // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
     function(item) { return JSON.stringify(item).toLowerCase().includes(args);
    }
    );

  }

}
