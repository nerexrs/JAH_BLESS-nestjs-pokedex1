import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
//JAH BLESS, así se importa el paquete de mongoose
//JAH BLESS, Document es una clase de mongoose
//JAH BLESS, que se utiliza para definir una entidad
//JAH BLESS, añade todas las funcionalidades que necesite para trabajar con mongo fácil
 //JAH BLESS, para decir que es un Schema de base de datos
    //JAH BLESS, se importa el Schema de mongoose
@Schema()
export class Pokemon extends Document{
    //JAH BLESS, así se define la entidad de pokemon
    //JAH BLESS, gracias a que es una clase entonces
    //JAH BLESS, puedo crear metodos para validar como quiero que se vean los datos
    //JAH BLESS, en este caso quiero que el nombre sea un string. Mongo ya sabe que el id es string



   //JAH BLESS, los Prop son decoradores de mongoose
    //JAH BLESS, que se utilizan para definir los campos de la entidad
    //JAH BLESS, en este caso quiero que el nombre sea un string y que sea único
    //JAH BLESS, y que tenga un index, lo mismo con el no aka numero
    @Prop({
        unique: true,
        index: true,
    })
    name: string;
    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);