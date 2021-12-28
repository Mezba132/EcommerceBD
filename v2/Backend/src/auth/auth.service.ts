import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from '../Models/user';
import { RegisterInput } from './dto/input/register.input';
import * as bcrypt from 'bcrypt'
import { LoginInput } from './dto/input/login.input';
import { JwtService } from '@nestjs/jwt'
import { UsersServices } from '../users/users.services';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly userServices : UsersServices,
    private readonly jwtService : JwtService
  ) {}

  async registerUser( registerInput : RegisterInput ) : Promise<User> {
      const newUser = new this.userModel(registerInput);
      const { email, mobile, hashPassword } = newUser
      const existEmail = await this.userModel.findOne({email}).exec();
      if(existEmail) {
        throw new Error('Email Already Existed !!');
      }
      const existPhone = await this.userModel.findOne({mobile}).exec();
      if (existPhone) {
        throw new Error('Phone Number Already Existed !!');
      }
      newUser.hashPassword = await bcrypt.hash(hashPassword, 10)
      return await newUser.save();
  }

  async validateUser(email : string, hashPassword : string ) : Promise<any>  {
    const user = await this.userServices.getUser({ email })
    if(!user) {
      return null;
    }
    const valid = await bcrypt.compare(hashPassword, user.hashPassword)
    if(valid) return user;
  }

  async login(loginUser : LoginInput) : Promise<any> {
    const user = await this.userServices.getUser({email : loginUser.email})
    const payload = {
      email: user.email,
      sub: user._id
    }
    return {
      token : this.jwtService.sign(payload),
      user : user
    }
  }
}
