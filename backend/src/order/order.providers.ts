import { DataSource } from 'typeorm';
import * as constants from '../constants';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
export const orderProviders = [
  {
    provide: constants.ORDER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: [constants.DATA_SOURCE],
  },
  {
    provide: constants.ORDER_ITEM_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderItem),
    inject: [constants.DATA_SOURCE],
  },
];
