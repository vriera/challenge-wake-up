import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UserType } from '../models/models';

//This guard checks if the logged user is a manager, and if it has access to the resource (in this case it is going to be the same id as the manager)
@Injectable()
export class OnlyManagerGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    let userId = request.params.id;

    if (typeof userId !== 'number') userId = parseInt(userId);
    const isManager = user.type === UserType.MANAGER;
    const claimedId = user.id === userId;
    if (!isManager || !claimedId) throw new ForbiddenException();
    return true;
  }
}
