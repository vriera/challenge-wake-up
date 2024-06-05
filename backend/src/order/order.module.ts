import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderProviders } from './order.providers';
import { DatabaseModule } from 'src/database/database.module';
import { MenuModule } from 'src/menu/menu.module';
import { ManagerModule } from 'src/manager/manager.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, MenuModule, ManagerModule, AuthModule],
  controllers: [OrderController],
  providers: [...orderProviders, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
