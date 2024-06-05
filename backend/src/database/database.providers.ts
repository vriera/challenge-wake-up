
import { DataSource } from 'typeorm';

import * as constants from "../constants"
export const databaseProviders = [
  {
    provide: constants.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME || 'admin',
        password: process.env.DB_PASSWORD || 'secret_password',
        database: process.env.DB_DATABASE || 'database',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
