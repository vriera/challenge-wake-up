import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalTokenStrategy extends PassportStrategy(Strategy, 'local-token'){

    constructor(private authService: AuthService){
        super({ usernameField: 'restaurant' , passwordField: 'token' });
    }

    async validate(username: string , password:string){
        console.log(username , password)
        const user = this.authService.signInWaiter(username,password);
        if(!user)
            throw new UnauthorizedException();
        return user;
    }
}