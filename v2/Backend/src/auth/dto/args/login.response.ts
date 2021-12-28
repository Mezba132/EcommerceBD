import { Field , ObjectType } from '@nestjs/graphql';
import { User } from '../../../Models/user';

@ObjectType()
export class LoginResponse {
  
  @Field()
  token : string

  @Field(() => User)
  user : User

}
