import { IsInt, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    @IsString()
    @MinLength(1)
    name: string;
    //JAH BLESS, esto valida que sea entero
    @IsInt()
    @IsPositive()
    //JAH BLESS, esto es el valor minimo a recibir
    @Min(1)
    no: number;
}