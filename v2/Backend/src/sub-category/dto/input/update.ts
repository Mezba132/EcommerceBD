import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateSub {

  @Field()
  readonly slug : string

  @Field()
  name : string

  @Field()
  categoryId : string

}