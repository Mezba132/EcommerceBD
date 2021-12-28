import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ObjectType, Field} from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Schema({
    timestamps : true,
    validateBeforeSave : true
})
@ObjectType()
export class User extends Document {

    @Prop({
        trim: true,
        maxlength : 32
    })
    @Field()
    @IsNotEmpty()
    name: string;

    @Prop({
        maxlength: 64,
    })
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Prop({
        unique: [true, 'Mobile Number must be unique'],
    })
    @Field()
    @IsNotEmpty()
    mobile : string;

    @Prop()
    @Field()
    @IsNotEmpty()
    hashPassword : string

    @Prop({
        trim : true,
        maxlength : 32
    })
    @Field()
    @IsNotEmpty()
    gender : string

    @Prop()
    @Field()
    role : string
}

export const UserSchema = SchemaFactory.createForClass(User);
