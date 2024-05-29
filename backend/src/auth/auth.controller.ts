import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards , Request, Get, Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalGuard, OnlyManagerGuard } from './guard';
import { AuthManagerDto } from './dto/AuthManagerDto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalGuard)
    @Post('login/manager')
    signIn(@Body() dto: AuthManagerDto) {
        return this.authService.signIn(dto.username ,dto.password );
    }


    @Get('manager/:id')
    @UseGuards(JwtAuthGuard , OnlyManagerGuard)
    getProfile(@Param('id') id: string, @Request() req) {
        return req.user;
    }
}
