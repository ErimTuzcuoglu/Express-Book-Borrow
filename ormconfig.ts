import database from './src/config/database.config';
import { DataSource } from 'typeorm';

export default new DataSource(database());
