import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ManagerModule } from '../manager/manager.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ManagerModule ,
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '100y' },
      }),
    PassportModule,
],
  providers: [
    AuthService , 
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    JwtStrategy,
    LocalStrategy
  ],
  exports: [PassportModule , JwtModule],
  controllers: [AuthController]
})
export class AuthModule {}
