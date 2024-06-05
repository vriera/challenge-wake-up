import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard, OnlyManagerGuard } from 'src/auth/guard';
import { OrderDto } from './dto/order.dto';
import { OnlyWaiterGuard } from 'src/auth/guard/only-waiter.guard';
import { Paginated } from 'src/commons/pagination.interface';
import { Order } from './entity/order.entity';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('')
  @UseGuards(JwtAuthGuard, OnlyWaiterGuard)
  addNewWaiter(@Req() req, @Body() dto: OrderDto) {
    const user = req.user;
    return this.orderService.createOrder(dto, user.id);
  }

  @Get('/:id')
  // @UseGuards(JwtAuthGuard )
  getOrder(@Req() req, @Param('id') id: number) {
    // const user = req.user;
    return this.orderService.getOrder(id);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getOrdersByManager(
    @Req() req,
    @Query('page') page: number,
    @Query('managerId') id: number,
    @Query('waiterId') waiterId: number,
  ): Promise<Paginated<Order>> {
    const user = req.user;
    if ((id && waiterId) || (!id && !waiterId))
      throw new BadRequestException(
        'Must include only one of [managerId , waiterId]',
      );

    try {
      if (page < 0) page = 0;
      return this.orderService.getOrders(id, waiterId, page);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
