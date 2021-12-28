import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {

    @Field()
    readonly email : string

    @Field()
    name : string

    @Field()
    mobile : string

}