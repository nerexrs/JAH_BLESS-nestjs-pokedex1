import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
//JAH BLESS, todos los pipes personalizados recibe pipe transform y tienen que usar el metodo transform
//JAH BLESS, porque viene como parte del tipo pipeTransform que no es más que una interfaz
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  
  
  transform(value: any, metadata: ArgumentMetadata) {
    // console.log({ value, metadata});
    //JAH BLESS, esta condición dice que el value o sea lo que le paso por parametro es un objetoValido de mongoose
    //JAH BLESS, y después dice que si no es valido que sea un id de mongoose entonces lanza un error
    //JAH BLESS, pero si es un objeto de mongo por defecto devuelve el value
    if ( !isValidObjectId(value) ) {
      throw new BadRequestException(`"${value}" is not a valid mongo id`)
    }

    return value;
  }
}

/*JAH BLESS
JAH BLESS
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
//JAH BLESS, todos los pipes personalizados recibe pipe transform y tienen que usar el metodo transform
//JAH BLESS, porque viene como parte del tipo pipeTransform que no es más que una interfaz
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  
  
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({ value, metadata});
    //JAH BLESS, si yo quiero que mi valor sea un string y que sea en mayúsculas
    //JAH BLESS, entonces le digo que me lo convierta a string y que me lo convierta a mayúsculas con el toUpperCase
    //JAH BLESS, voy a ver primero el valor normal y después sí lo veré capitalizado por el return

    //JAH BLESS, en resumen, lo que sea que retorne va a ser mi valor transformado, los pipes no son más que tuberías
    //JAH BLESS, que transforman data de un lado a otro. El tubo del string cambia cualquier dato a string

    //JAH BLESS, piensalo literal un tubo como en Mario y como si la data fuera el pj que se va de un lugar a otro
    //JAH BLESS, en lugar de que se mueva de lugar se trnsforma de un tipo a otro

    //JAH BLESS, en este caso el tubo de capitalizar cambia el valor de minúsculas a mayúsculas

    return value.toUpperCase();
  }
}
 */