import { DataSource } from 'typeorm';
import { Manager } from './entity/manager.entity';
import * as constants from '../constants';
export const managerProviders = [
  {
    provide: constants.MANAGER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Manager),
    inject: [constants.DATA_SOURCE],
  },
];
