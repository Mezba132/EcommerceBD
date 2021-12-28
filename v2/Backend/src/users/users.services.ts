import { Injectable } from "@nestjs/common";
import { User } from "../Models/user";
import {GetUserArgs} from "./dto/args/getUser.Args";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DeleteUserInput} from "./dto/input/delete-user.input";
import {UpdateUserInput} from "./dto/input/update-user.input";

@Injectable()
export class UsersServices {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

     async getUsers() : Promise<User[]> {
            return await this.userModel.find().exec();
     }

     async getUser( getUserArgs : GetUserArgs ) : Promise<User> {
            return await this.userModel.findOne({ email : getUserArgs.email }).exec()
     }

     async deleteUser( deleteUser : DeleteUserInput ) : Promise<User> {
            return await this.userModel.findOneAndDelete({ email : deleteUser.email }).exec()
     }

     async updateUser( updateUser : UpdateUserInput ) : Promise<User> {
            const user = await this.userModel.findOne({email : updateUser.email}).exec()
            user.name = updateUser.name
            user.mobile = updateUser.mobile
            return user.save();
     }

}
