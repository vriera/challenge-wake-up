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
export class OnlyWaiterGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const isWaiter = user.type === UserType.WAITER;
    if (!isWaiter) throw new ForbiddenException();
    return true;
  }
}
