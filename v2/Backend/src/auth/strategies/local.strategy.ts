import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService : AuthService) {
        super({ usernameField: 'email', passwordField : 'hashPassword' })
    }

    async validate( email : string, hashPassword : string ) : Promise<any> | null {
        const user = await this.authService.validateUser(email, hashPassword)
        if(!user) {
            throw new UnauthorizedException()
        }
        return user;
    }
}
