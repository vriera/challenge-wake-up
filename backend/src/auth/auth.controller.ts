import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards , Request, Get, Param, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalGuard, OnlyManagerGuard } from './guard';
import {  AuthWaiterDto } from './dto/auth-waiter.dto';
import { AuthManagerDto } from './dto/auth-manager.dto';
import { LocalTokenGuard } from './guard/local-token.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalGuard)
    @Post('login/manager')
    signIn(@Req() req , @Body() dto: AuthManagerDto) {
        return req.user
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalTokenGuard)
    @Post('login/waiter')
    logInWaiter(@Req() req , @Body() dto: AuthWaiterDto) {
        return req.user;
    }

    @Get('manager/:id')
    @UseGuards(JwtAuthGuard , OnlyManagerGuard)
    getProfile(@Param('id') id: string, @Request() req) {
        return req.user;
    }
}
