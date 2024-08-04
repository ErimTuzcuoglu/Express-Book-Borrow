import { Router } from 'express';
import users from './users.routes';
import books from './books.routes';

const router = Router();
router.use('/user', users);
router.use('/book', books);

export default router;
