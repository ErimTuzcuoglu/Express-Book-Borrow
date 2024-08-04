import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import path from 'path';
import config from '../config';
import { Book, Borrow, User } from '../models';

export default (): PostgresConnectionOptions => {
  // read connection options from ormconfig file (or ENV variables)
  // const connectionOptions = await getConnectionOptions();
  const connectionOptions: PostgresConnectionOptions = {
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    database: config.database.database,
    synchronize: false,
    logging: false,
    entities: [Borrow, Book, User],
    migrations: [`${path.join(__dirname, '../', 'migrations')}/*{.ts,.js}`],
    migrationsRun: false,
  };

  return connectionOptions;
};
