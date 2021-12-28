import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCategory {

  @Field()
  @IsNotEmpty()
  name : string

}