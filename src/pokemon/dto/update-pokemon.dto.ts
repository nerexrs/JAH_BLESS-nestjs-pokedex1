import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';
//JAH BLESS, el PartialType me permite que extienda no solo la clase sino también los tipos
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
