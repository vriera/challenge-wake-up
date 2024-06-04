import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MenuItem } from './entity/menu-item.entity';
import * as constants from '../constants'
import { FindOneOptions, IsNull, Not, Repository } from 'typeorm';
import { MenuItemDTO } from './dto/menu-item.dto';
import { ManagerService } from '../manager/manager.service';
import { Paginated } from '../commons/pagination.interface';
import { Manager } from '../manager/entity/manager.entity';
import { PatchMenuItemDTO } from './dto/patch-menu-item.dto';
import { MenuItemType } from './enums/menu-item-type.enum';

@Injectable()
export class MenuService {

    constructor(@Inject(constants.MENU_ITEM_REPOSITORY) private menuRepository: Repository<MenuItem> , private managerService: ManagerService ){

    }


    async addItem(managerId:number ,dto: MenuItemDTO) : Promise<MenuItem> {
       
        const menuItem = new MenuItem();
        menuItem.name = dto.name;
        menuItem.description = dto.description;
        //The guard will ensure the manager of that ID actually exists
        menuItem.manager = { id: managerId } as Manager;
        menuItem.price = dto.price;
        menuItem.type = dto.type;

        return await this.menuRepository.save(menuItem);

    }
    
async updateItem(id: number, dto: PatchMenuItemDTO): Promise<MenuItem> {
    // Retrieve the existing menu item
    const menuItem = await this.menuRepository.findOne({where: {id}});

    if (!menuItem) 
        throw new Error("Menu item not found");
    

    
    if (dto.description !== undefined) 
        menuItem.description = dto.description;
    
    if (dto.price !== undefined) 
        menuItem.price = dto.price;

    if (dto.type !== undefined) 
        menuItem.type = dto.type;

    // Save the updated menu item
    return await this.menuRepository.save(menuItem);
}

    async getMenu(managerId: number , pageNumber: number , filter?: MenuItemType ) : Promise<Paginated<MenuItem>>{
        console.log(pageNumber)
        const manager = await this.managerService.findById(managerId);
        const take = constants.PAGE_DEFAULT_SIZE;
        const skip = pageNumber * take;
        const where :any = {manager: manager}
        if(filter)
            where.type = filter;
        console.log("where" , where)
        const [result , total ] = await this.menuRepository.findAndCount( {
            where: where , order: { type: "ASC" , id:"DESC"},

            take,
            skip
        })
        return new Paginated<MenuItem>(result,total,take);
    }

    // async getDeletedMenu(managerId: number , pageNumber: number  ) : Promise<Paginated<MenuItem>>{
    //     const manager = await this.managerService.findById(managerId);
    //     const take = constants.PAGE_DEFAULT_SIZE;
    //     const skip = pageNumber * take;
    //     const [result , total ] = await this.menuRepository.findAndCount( {
    //         where: {manager: manager , deletedAt: Not(IsNull())}, order: { type: "ASC"},
    //         take,
    //         skip
    //     })
    //     return {
    //         result,
    //         total
    //     }
    // }


    async getMenuItem(managerId: number , itemId: number  ) : Promise<MenuItem>{
        const manager = await this.managerService.findById(managerId);
        return await this.menuRepository.findOne( {where: {id: itemId , manager} , withDeleted:true } )
    }

    async deactivateItem(itemId: number) {
        const exists = await this.menuRepository.exists({where: {id: itemId  , deletedAt: IsNull()} });

        if (!exists) 
          throw new NotFoundException('Item not found');
        
        return await this.menuRepository.softDelete(itemId);
    }


}
