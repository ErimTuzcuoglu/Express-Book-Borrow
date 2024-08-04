import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
/* #region IOC */
import { iocContainer } from '../../config/ioc.container';
import { IBookService } from '../../services/contracts/books';
import { TYPES } from '../../types/contract-types';
import middlewares from '../middlewares';

/* #endregion */
const router = Router();

const bookService = iocContainer.get<IBookService>(TYPES.IBookService);

router.get(
  '/',
  middlewares.wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const books = await bookService.findAll();
    return res.json(books).status(200);
  }),
);

router.get(
  '/:id',
  middlewares.wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const book = await bookService.findOneById(req.query?.id as unknown as number);
    return res.json(book || {}).status(200);
  }),
);

router.post(
  '/',
  celebrate({
    body: Joi.object({
      name: Joi.string().min(2).max(30).required(),
    }),
  }),

  middlewares.wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const book = await bookService.create(req.body);
    return res.json(book).status(201);
  }),
);

export default router;
