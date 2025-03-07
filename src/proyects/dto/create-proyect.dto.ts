import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TechnologiesDto } from './technologies.dto';

export class CreateProyectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  urlImage: string;

  @ValidateNested({ each: true })
  @Type(() => TechnologiesDto)
  @ArrayNotEmpty()
  tecnologies: TechnologiesDto[];
}
