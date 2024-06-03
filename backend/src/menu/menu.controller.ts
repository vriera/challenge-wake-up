import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, OnlyManagerGuard } from '../auth/guard';
import { MenuService } from './menu.service';
import { MenuItemDTO } from './dto/menu-item.dto';
import { MenuItem } from './entity/menu-item.entity';
import { Paginated } from 'src/commons/pagination.interface';
import { PatchMenuItemDTO } from './dto/patch-menu-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { MenuItemType } from './enums/menu-item-type.enum';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) { }



    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard, OnlyManagerGuard)
    @Post('/:id')
    async addItem(@Param('id') id: number, @Body() dto: MenuItemDTO): Promise<MenuItem> {
        // const name = dto.name;
        const res = await this.menuService.addItem(id, dto);
        // for(let i = 1 ; i<500 ; i++){
        //     dto.name = name + `-${i}`;
        //     await this.menuService.addItem(id,dto)
        // }
        return res;
    }



    @UseGuards(JwtAuthGuard, OnlyManagerGuard)
    @Get('/:id')
    async getItems(@Param('id') id: number, @Query('page') page: number, @Query('filter') filter: MenuItemType): Promise<Paginated<MenuItem>> {
        try {
            if (page < 0)
                page = 0;
            return this.menuService.getMenu(id, page ?? 0, filter);
        } catch (e) {
            console.log(e)
            throw e;
        }
    }


    @UseGuards(JwtAuthGuard, OnlyManagerGuard)
    @Get('/:id/item/:itemId')
    async getItem(@Param('id') menuId: number, @Param('itemId') itemId: number): Promise<MenuItem> {
        return this.menuService.getMenuItem(menuId, itemId);
    }


    // Not allowed
    // @UseGuards(JwtAuthGuard , OnlyManagerGuard)
    // @Patch('/:id/item/:itemId')
    // async update(@Param('id') menuId: number , @Param('itemId') itemId: number , @Body() dto: PatchMenuItemDTO) {
    //     return this.menuService.updateItem(itemId, dto);
    // }


    @UseGuards(JwtAuthGuard, OnlyManagerGuard)
    @Delete('/:id/item/:itemId')
    async delete(@Param('id') menuId: number, @Param('itemId') itemId: number) {
        return this.menuService.deactivateItem(itemId);
    }
}
