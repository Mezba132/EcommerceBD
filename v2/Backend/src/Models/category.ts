import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ObjectType, Field} from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@Schema({
    timestamps : true,
    validateBeforeSave : true
})
@ObjectType()
export class Category extends Document {

  @Prop({
    trim : true,
    maxlength : 32
  })
  @Field()
  @IsNotEmpty()
  name: string;

  @Prop({
    unique : true,
    lowercase : true,
    index : true
  })
  @Field()
  slug : string
}

export const CategorySchema = SchemaFactory.createForClass(Category);