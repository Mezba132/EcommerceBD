import { Field, InputType } from "@nestjs/graphql";
import {  IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  name : string

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email : string

  @Field()
  @IsNotEmpty()
  mobile : string

  @Field()
  @IsNotEmpty()
  hashPassword : string

  @Field()
  @IsNotEmpty()
  gender : string

  @Field({defaultValue : 'customer'})
  role : string
}