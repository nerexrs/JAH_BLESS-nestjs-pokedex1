import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
//JAH BLESS, al decirle que una variable es de tipo model y que tiene un génerico pokemon que es el entity que creamos
//JAH BLESS,es que yo puedo usar mi entidad para guardar en base de datos, pero solo con llamarlo no es suficiente porque no es 
//JAH BLESS, por si solo injectable o sea no es un provider aka servicio pero más accurate es provider
//JAH BLESS, si yo quiero poder inyectarlo de forma controlada basada en nest entonces para eso la gente de nestjs creo el decorador
//JAH BLESS,injectableModel para trabajar con mongoose. Y ese decorador recibe como parametro su nombre en este caso
//JAH BLESS, le pasamos el name de nuestro pokemon. Esto lo necestiamos para saber como va a manejar el modelo
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
//JAH BLESS, como las insertar en base de datos es asincrono uso async await
  async create(createPokemonDto: CreatePokemonDto) {
    try {
        //JAH BLESS, esto para guardar en minuscula los nombres
        createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase()
        //JAH BLESS, este .create es un método que se agrega al usar el decorador InjectModel para crear datos en la base de datos
        //JAH BLESS, dentro del create le mando mi pokemon Dto, ahí ya sabemos qué propiedades tiene, el name y el número. En este
        //JAH BLESS, punto ya está validado todo. Si no necesito validaciones solo haría lo del this.pokemonModel, etc
        //JAH BLESS, basicamente con el modelo yo tengo una plantilla donde cuando le paso al método .create del modelo
        //JAH BLESS, como argumento mi dto o lo que sea que estoy creando, cuando le paso eso me crea automatico el valor en la base de datos
        //JAH BLESS,porque basicamente el modelo está traduciendo los datos que recibe del dto y los traduce a mongoose. Super fácil
        const pokemon = await this.pokemonModel.create(createPokemonDto)

        return pokemon;

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    //JAH BLESS, acá le digo que mi variable sea mi entity
    let pokemon: Pokemon
    //JAH BLESS, acá le digo que si mi term transformado a numero por el + es un numbero
    //JAH BLESS,porque NaN es para decir que no es un número y !IsNan para decir que sí es
    //JAH BLESS, es decir que me term sí es número, si eso es verdad entonces le digo a mi pokemonModel
    //JAH BLESS, que representa a mongo que busque mi no: es igual a mi term
    //JAH BLESS, Podríamos ponerle term en lugar de term para que quede más claro, Puedo poner más condiciones en el findOne
    //JAH BLESS, al parecer los nombres que estoy usando en mis funciones son comunes, varios los usan 
    if ( !isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term})
      
    }

    //JAH BLESS, MongoID, esta propiedad de isValidObjectId se importa de mongoose y valida si el objeto es de mongo. Por eso le paso el term
    //JAH BLESS,para que no valide si es un objeto cuando no existe un pokemon ponerle lo del !pokemomn &&
    if ( !pokemon && isValidObjectId(term) ) {
      pokemon = await this.pokemonModel.findById( term )
    } 

    //Name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim()  })
      
    }
//JAH BLESS, si no hay pokemon entonces lanzo una excepción, esta es controlada
    if (!pokemon) 
      throw new NotFoundException(`Pokemon with id, name or no "${ term}" not found`) 

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    //JAH BLESS, ya findOne valida id, name, mongoid entonces solo lo llamo de nuevo. Si no hay pokemon llega al trhow, si hay valida 
    const pokemon = await this.findOne( term )
    //Jahh bless, este pokemon tiene todo lo que mongoose nos ofrece
    if ( updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    try {
        await pokemon.updateOne( updatePokemonDto)
      //JAH BLESS, todas las variables son en minuscula los tipos en mayuscula
        return {...pokemon.toJSON(), ...updatePokemonDto};

        //JAH BLESS, el error es muy abierto
    } catch (error) {
        this.handleExceptions(error)
      }
    }

  async remove(id: string) {
    // // const pokemon = await this.findOne( id )
    // // await pokemon.deleteOne();
    // return { id }
    // const result = await this.pokemonModel.findByIdAndDelete( id )
    //JAH BLESS, cuidado con deleteMany, deleteOne es solo para uno
    //JAH BLESS,con esto solo hago una consulta y hago la validación. Esta regla casi no falla pero podría estar en
    //JAH BLESS, un try y catch

    const { deletedCount} = await this.pokemonModel.deleteOne({_id: id } );

    if ( deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${ id }" not found`)

    return;

  }

//JAH BLESS, estas excepciones no son controladas, son errores que no se pueden controlar facilmente por eso está en un método privado
  private handleExceptions(error: any) {
    //JAH BLESS, esto muestra si el dato está repetido, el error 11 mil me dice que ya existe una copia en base de datos del archivo
    if (error.code === 11000 ) {
      throw new BadRequestException(`Pokemon EXISTS IN DB ${ JSON.stringify( error.keyValue )}`)
    }
    //JAH BLESS, el throw hace que mi código ya no se siga ejecutando, es como un return pero el throw evita que siga ejecutandose toda la app
    console.log(error)
    throw new InternalServerErrorException(`Can't update pokemon - check server logs`)
  }
}
