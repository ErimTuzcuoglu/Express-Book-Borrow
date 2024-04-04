import * as express from 'express';
import 'reflect-metadata';
import database from './database';
import server from './server';
import { DataSource } from 'typeorm';
import Container from 'typedi';

export default async (app: express.Application) => {
  database();
  await (Container.get(DataSource)).initialize();
  console.log('DB loaded and connected!');

  await server(app);
  console.log('Server loaded!');
};
