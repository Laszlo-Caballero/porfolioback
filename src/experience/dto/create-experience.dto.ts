import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  urlImage: string;

  @IsString()
  @IsNotEmpty()
  time: string;
}
