
import { DataSource } from 'typeorm';
import {  Waiter } from './entity/waiter.entity';
import * as constants from '../constants'
export const waiterProviders = [
  {
    provide: constants.WAITER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Waiter),
    inject: [constants.DATA_SOURCE],
  }
];
