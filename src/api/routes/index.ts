import { Router } from 'express';
import users from './users';
import books from './books';

const router = Router();
users(router);
books(router);

export default router;
