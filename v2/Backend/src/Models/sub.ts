import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose'
import { Category } from './category';
import {ObjectType, Field} from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@Schema({
  timestamps : true,
  validateBeforeSave : true,
})
@ObjectType()
export class Sub extends Document {

  @Prop({
    trim : true,
    maxlength : 32
  })
  @Field()
  @IsNotEmpty()
  name: string;

  @Prop({
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  })
  @Field()
  categoryId: Category

  @Prop({
    unique : true,
    lowercase : true,
    index : true
  })
  @Field()
  slug : string

}

export const SubSchema = SchemaFactory.createForClass(Sub);