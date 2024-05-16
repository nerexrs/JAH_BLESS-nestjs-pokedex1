import { join } from 'path'; //JAH BLESS, paquete de node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

//JAH BLESS, así sirvo contenido estatico, de mi dierectorio raiz, dale dos espacios y ve a public y public tiene el index.html
@Module({
  imports: [
  ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),  
    }),
    //así se conecta a la base de datos
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
//así se importa el modulo de pokemon
  PokemonModule,
CommonModule
  ],
  })
  export class AppModule {}
