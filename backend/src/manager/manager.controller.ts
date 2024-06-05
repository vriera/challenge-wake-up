import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerDTO } from './dto/manager.dto';
import { JwtAuthGuard, OnlyManagerGuard } from '../auth/guard';
import { CreateWaiterDTO } from './dto/create-waiter.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('manager')
@Controller('manager')
export class ManagerController {

    constructor(private managerService: ManagerService) {}

    @Post()
    signIn(@Body() dto: ManagerDTO) {
        return this.managerService.add(dto);
    }

    @Get(':id')
    get(@Param("id") id:number){
        return this.managerService.findById(id);
    }


    @Post(':id/waiter')
    @UseGuards(JwtAuthGuard , OnlyManagerGuard)
    addNewWaiter(@Param("id") id:number , @Body() dto: CreateWaiterDTO){
        return this.managerService.addWaiter(id,dto);
    }

    @Get(':id/waiter')
    @UseGuards(JwtAuthGuard , OnlyManagerGuard)
    getWaiter(@Param("id") id:number , @Query("page") page: number ){
        if(page < 0)
            page = 0;
        return this.managerService.findWaiters(id,  page ?? 0);
    }

    @Get(':id/waiter/:waiterId')
    @UseGuards(JwtAuthGuard , OnlyManagerGuard)
    getWaiterList(@Param("id") id:number , @Param("waiterId") waiterId: number ){
        return this.managerService.findWaiter(waiterId);
    }


    
    @Patch(':id/waiter/:waiterId')
    @UseGuards(JwtAuthGuard , OnlyManagerGuard)
    updateToken(@Param("id") id:number , @Param("waiterId") waiterId:number){
        return this.managerService.resetToken(waiterId);
    }
}

