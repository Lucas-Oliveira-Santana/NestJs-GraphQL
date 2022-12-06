import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: "This field can't be empty" })
  @IsOptional()
  @Field()
  name?: string;

  @IsEmail()
  @Field()
  @IsNotEmpty({ message: "This field can't be empty" })
  @IsOptional()
  email?: string;

  @IsString()
  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @IsOptional()
  password?: string;
}
