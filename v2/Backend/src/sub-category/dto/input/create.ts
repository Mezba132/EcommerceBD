import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateSub {

  @Field()
  @IsNotEmpty()
  name : string

  @Field()
  @IsNotEmpty()
  categoryId : string;

}