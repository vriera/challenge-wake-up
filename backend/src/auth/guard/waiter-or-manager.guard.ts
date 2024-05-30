import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { UserType } from '../models/models';
import { AuthService } from '../auth.service';



//This guard checks if the logged user is a manager, and if it has access to the resource (in this case it is going to be the same id as the manager)
@Injectable()
export class WaiterOrManagerGuard  implements CanActivate {
  constructor(private authService: AuthService) {
}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    let managerId = request.params.id;
    
    if(typeof managerId !== 'number')
        managerId = parseInt(managerId); 
    
    const isManager = user.type === UserType.MANAGER;

    if(isManager){
        const claimedId = user.id === managerId;
        if(!isManager || !claimedId)
            throw new ForbiddenException();
        return true;
    }

    const isValidWaiter = await this.authService.isWaiter(managerId, user.id);
    if(!isValidWaiter)
        throw new ForbiddenException();

    return true;
  }
  
}