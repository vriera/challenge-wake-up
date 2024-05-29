import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ManagerService } from '../manager/manager.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserInfo, JWTPayload, UserType } from './models/models';

@Injectable()


export class AuthService {
    constructor(private ManagerService: ManagerService , private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.ManagerService.findByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload : JWTPayload = { sub: user.userId, username: user.username , type: UserType.MANAGER};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    }
}
