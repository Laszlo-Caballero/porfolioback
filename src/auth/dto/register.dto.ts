import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from '../enum/roles.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(RolesEnum)
  @IsNotEmpty()
  role: string;
}
