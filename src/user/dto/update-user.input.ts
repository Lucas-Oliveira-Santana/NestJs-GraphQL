import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: "This field can't be empty" })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: "This field can't be empty" })
  @IsOptional()
  email?: string;
}
