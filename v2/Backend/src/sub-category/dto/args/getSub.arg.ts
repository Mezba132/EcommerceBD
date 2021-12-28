import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class GetSubArg {
  @Field()
  readonly slug : string
}