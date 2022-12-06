import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  @IsNotEmpty({ message: "This field can't be empty" })
  name: string;

  @IsEmail()
  @Field()
  @IsNotEmpty({ message: "This field can't be empty" })
  email: string;

  @IsString()
  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
