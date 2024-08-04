import * as express from 'express';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import server from './server';
/* #region IOC */
import { iocContainer } from '../config/ioc.container';
import { TYPES } from '../types/contract-types';
/* #endregion */

export default async (app: express.Application) => {
  await iocContainer.get<DataSource>(TYPES.DataSource).initialize();
  console.log('DB loaded and connected!');

  await server(app);
  console.log('Server loaded!');
};
