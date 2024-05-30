import { Module } from '@nestjs/common';
import { WaiterController } from './waiter.controller';
import { WaiterService } from './waiter.service';
import { waiterProviders } from './waiter.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WaiterController],
  providers: [...waiterProviders,WaiterService],
  exports: [WaiterService]
})
export class WaiterModule {}
