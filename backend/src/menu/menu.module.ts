import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { menuProviders } from './menu.providers';
import { ManagerModule } from 'src/manager/manager.module';
import { AuthService } from 'src/auth/auth.service';


@Module({
  imports: [DatabaseModule , AuthModule , ManagerModule],
  providers: [...menuProviders ,MenuService ],
  controllers: [MenuController],
  exports: [MenuService]
})
export class MenuModule {}
