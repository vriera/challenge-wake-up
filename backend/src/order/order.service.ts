import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as constants from "../constants"
import { Order } from './entity/order.entity';
import { In, Repository } from 'typeorm';
import { MenuService } from 'src/menu/menu.service';
import { OrderDto } from './dto/order.dto';
import { ManagerService } from 'src/manager/manager.service';
import { OrderItem } from './entity/order-item.entity';
import { MenuItem } from 'src/menu/entity/menu-item.entity';
import { OrderStatus } from './enums/order-status.enum';
import { Waiter } from 'src/waiter/entity/waiter.entity';
import { Paginated } from 'src/commons/pagination.interface';
@Injectable()
export class OrderService {
    constructor  ( @Inject(constants.ORDER_REPOSITORY) private orderRepository: Repository<Order>,
     private menuService: MenuService , 
     private managerService : ManagerService){}



    async createOrder( dto: OrderDto , waiterId: number) : Promise<Order>{

        const waiter = await this.managerService.findWaiter(waiterId);
        const managerId = waiter.manager.id; 

        const order = new Order();
        

        const orderItems = dto.items.map(itemDetail => {
            const orderItem = new OrderItem();
            orderItem.menuItem = { id: itemDetail.itemId } as MenuItem // Just reference the ID
            orderItem.itemCount = itemDetail.amount;
            return orderItem;
        });
        let promises = orderItems.map((x) => x.menuItem.id).map(x => this.menuService.isMenuItem(managerId , x))
        let areValidItems : boolean[] = await Promise.all(promises);
        const allTrue = areValidItems.every(value => value === true);
        
        if(!allTrue)
            throw new BadRequestException("Invalid items found")

        order.description = dto.description;
        order.items = orderItems
        order.waiter = waiter
        order.status = OrderStatus.CREATED;
        return await this.orderRepository.save(order);
    }

    async getOrder( orderId: number) : Promise<Order>{

        let order = await this.orderRepository.findOne({where: {id:orderId } , relations: ["items" , "items.menuItem" ,"waiter"]});
        return {...order , waiter: { id:order.waiter.id , name:order.waiter.name} as Waiter}
    }

    // async getMenu(managerId: number , pageNumber: number , filter?: MenuItemType ) : Promise<Paginated<MenuItem>>{
    //     console.log(pageNumber)
    //     const manager = await this.managerService.findById(managerId);
    //     const take = constants.PAGE_DEFAULT_SIZE;
    //     const skip = pageNumber * take;
    //     const where :any = {manager: manager}
    //     if(filter)
    //         where.type = filter;
    //     console.log("where" , where)
    //     const [result , total ] = await this.menuRepository.findAndCount( {
    //         where: where , order: { type: "ASC" , id:"DESC"},
    //         take,
    //         skip
    //     })
    //     return new Paginated<MenuItem>(result,total,take);
    // }
    async getOrders( managerId: number , waiterId : number, pageNumber: number) : Promise<Paginated<Order>>{
        if(waiterId)
            return this.getOrdersWaiter(waiterId,pageNumber)

        
        const take = constants.PAGE_DEFAULT_SIZE;
        const skip = pageNumber * take;
        console.log(pageNumber,skip,take)

        const [result , count] = await this.orderRepository.createQueryBuilder("order")
        .select("order")
        .leftJoinAndSelect("order.waiter" , "linkedWaiter")
        .leftJoinAndSelect("linkedWaiter.manager" ,"linkedManager")
        .where("linkedWaiter.manager = :managerId" , {managerId}).orderBy("order.created_at", "DESC").skip(skip).take(take).getManyAndCount()
       

        return new Paginated<Order>(result,count,take);
    }
    async getOrdersWaiter( waiterId : number, pageNumber:number) : Promise<Paginated<Order>>{
        const take = constants.PAGE_DEFAULT_SIZE;
        const skip = pageNumber * take;


        const [result , total] = await this.orderRepository.findAndCount( {
                    where: {
                        waiter: {id: waiterId} as Waiter
                    } , order: { created_at: "DESC"},
                    take,
                    skip
                })

        return new Paginated<Order>(result,total,take);
    }

}
