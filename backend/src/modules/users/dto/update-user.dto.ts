import { PartialType } from '@nestjs/mapped-types';
import { ApiHideProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiHideProperty()
  @IsString()
  @MinLength(5)
  current?: string;
}
