import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ManagerController } from './manager/manager.controller';
import { ManagerModule } from './manager/manager.module';
import { MenuModule } from './menu/menu.module';
import { WaiterModule } from './waiter/waiter.module';

@Module({
  imports: [AuthModule, ManagerModule, MenuModule, WaiterModule],
  controllers: [AppController, ManagerController],
  providers: [AppService],
})
export class AppModule {}
