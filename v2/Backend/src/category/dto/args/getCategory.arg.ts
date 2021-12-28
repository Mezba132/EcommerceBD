import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class getCategoryArg {
  @Field()
  readonly slug : string
}