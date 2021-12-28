import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCategory {

  @Field()
  readonly slug : string

  @Field()
  name : string

}