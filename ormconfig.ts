import database from './src/loaders/database';
import { DataSource } from 'typeorm';

export default new DataSource(database());
