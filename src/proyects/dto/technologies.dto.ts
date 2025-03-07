import { IsNotEmpty, IsString } from 'class-validator';

export class TechnologiesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  urlImage: string;
}
