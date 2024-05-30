
import { DataSource } from 'typeorm';
import { MenuItem } from './entity/menu-item.entity';
import * as constants from '../constants'
export const menuProviders = [
  {
    provide: constants.MENU_ITEM_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MenuItem),
    inject: [constants.DATA_SOURCE],
  }
];
