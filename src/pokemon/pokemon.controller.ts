import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
//JAH BLESS, si queremos usar un http code específico que nos retorne cuando sea específico
//JAH BLESS, si usamos HttpStatus. cuando hacemos el . nest nos da todos los códigos de error representado por una palabra asociada
//JAH BLESS, así no nos acordamos de los numeros sino solo la palabra
//JAH BLESS, acuerdate que en tableplus primero borras con el supr y después ctr + s para guardar cambios
//JAH BLESS, con el código puede que al hacer un post así sea unauthorized lo haga igual porque no estoy manejando esa lógica, solo
//JAH BLESS, devolviendo el error
  @Post()
  // @HttpCode( HttpStatus.UNAUTHORIZED )
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
