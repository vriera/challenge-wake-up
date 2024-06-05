import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ManagerModule } from '../manager/manager.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard, OnlyManagerGuard } from './guard';
import { LocalStrategy } from './strategies/local.strategy copy';
import { LocalTokenStrategy } from './strategies/local-waiter.strategy';

@Module({
  imports: [
    forwardRef( () => ManagerModule) ,
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '100y' },
      }),
    PassportModule,
],
  providers: [
    AuthService, 
    JwtStrategy,
    LocalStrategy,
    LocalTokenStrategy,
    OnlyManagerGuard,
    JwtAuthGuard
  ],
  exports: [PassportModule , JwtModule , OnlyManagerGuard , JwtAuthGuard , AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
