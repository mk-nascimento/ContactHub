import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

interface IValue {
  value: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @Transform(({ value }: IValue) => hashSync(value), { groups: ['transform'] })
  password: string;
}
