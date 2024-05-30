import { Module, forwardRef } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { DatabaseModule } from '../database/database.module';
import { managerProviders } from './manager.providers';
import { AuthModule } from '../auth/auth.module';
import { WaiterModule } from '../waiter/waiter.module';

@Module({
  imports: [DatabaseModule ,  forwardRef( () => AuthModule) , WaiterModule],
  providers: [
    ...managerProviders,
    ManagerService],
  exports: [ManagerService]
})
export class ManagerModule {}
