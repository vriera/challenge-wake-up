import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserType } from '../models/models';

// import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OnlyManagerGuard  implements CanActivate {
  constructor() {
}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const userId = request.params.id;

    const isManager = user.type === UserType.MANAGER;
    const claimedId = user.id === userId;
    if(!isManager || !claimedId)
        throw new UnauthorizedException();
    return true;
  }
}