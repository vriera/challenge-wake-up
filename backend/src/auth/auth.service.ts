import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ManagerService } from '../manager/manager.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload, UserType } from './models/models';

@Injectable()
export class AuthService {
  constructor(
    private managerService: ManagerService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    console.log('singing in');
    const user = await this.managerService.findByUsername(username);
    console.log(user);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload: JWTPayload = {
      sub: user.id,
      username: user.username,
      type: UserType.MANAGER,
      restaurantId: user.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signInWaiter(restaurant: string, token: string): Promise<any> {
    const manager = await this.managerService.findByRestaurant(restaurant);

    if (!manager) throw new UnauthorizedException();

    const waiter = await this.managerService.findWaiterByToken(
      manager.id,
      token,
    );
    console.log('found waiter', waiter);
    if (!(waiter && waiter.token === token)) throw new UnauthorizedException();

    const payload: JWTPayload = {
      sub: waiter.id,
      username: waiter.name,
      type: UserType.WAITER,
      restaurantId: waiter.manager.id,
    };
    console.log(payload);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async isWaiter(managerId: number, waiterId: number): Promise<boolean> {
    const manager = await this.managerService.findById(managerId);
    if (!manager) throw new NotFoundException('Manager not found');

    const waiter = await this.managerService.findWaiter(waiterId);
    if (!waiter) throw new NotFoundException('Waiter not found');

    return managerId === waiter.manager.id;
  }
}
