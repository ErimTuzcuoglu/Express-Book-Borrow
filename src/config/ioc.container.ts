import { Container } from 'inversify';
import { TYPES } from '../types/contract-types';
import { DataSource } from 'typeorm';
import databaseConfig from './database.config';
/* #region Contracts */
import { IBookService } from '../services/contracts/books';
import { IUserService } from '../services/contracts/users';
/* #endregion */
/* #region Services */
import BookService from '../services/books';
import UserService from '../services/users';
/* #endregion */

const connectionOptions = databaseConfig(); // inversify + typeorm

const iocContainer = new Container();
iocContainer.bind<DataSource>(TYPES.DataSource).toConstantValue(new DataSource(connectionOptions));
iocContainer.bind<IBookService>(TYPES.IBookService).to(BookService).inRequestScope();
iocContainer.bind<IUserService>(TYPES.IUserService).to(UserService).inRequestScope();

export { iocContainer };
