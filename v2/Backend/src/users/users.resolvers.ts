import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUserArgs } from "./dto/args/getUser.Args";
import { User } from "../Models/user";
import { UsersServices } from "./users.services";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { hasRoles } from '../auth/custom-decorators/roles.decorator';

@Resolver( () => User)
export class UsersResolvers {

    constructor(
      private readonly userServices : UsersServices
    ) {}

    @Query( () => [User])
    @hasRoles('customer')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getUsers() : Promise<User[]> {
        return this.userServices.getUsers()
    }

    @Query( () => User)
    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    findUser(@Args() getUserArgs : GetUserArgs) : Promise<User> {
        return this.userServices.getUser(getUserArgs)
    }

    @Mutation(() => User)
    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    updateUser(@Args('updateUserData') updateUserData : UpdateUserInput) : Promise<User> {
        return this.userServices.updateUser(updateUserData)
    }

    @Mutation(() => User)
    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    deleteUser(@Args('deleteUserData') deleteUserData : DeleteUserInput) : Promise<User> {
        return this.userServices.deleteUser(deleteUserData)
    }

}
