import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
/* #region IOC */
import { iocContainer } from '../../config/ioc.container';
import { IUserService } from '../../services/contracts/users';
import { TYPES } from '../../types/contract-types';
import middlewares from '../middlewares';
/* #endregion */

const router = Router();

const userService = iocContainer.get<IUserService>(TYPES.IUserService);

router.get(
  '/',
  // middlewares.isAuth,
  // middlewares.attachCurrentUser,
  middlewares.wrapAsync(async (req, res, next) => {
    const users = await userService.findAll();
    return res.json(users).status(200);
  }),
);

router.get(
  '/:id',
  middlewares.wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.findOneById(req.params?.id as unknown as number);
    return res.json(user || {}).status(200);
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
    const user = await userService.create(req.body);
    return res.json(user).status(201);
  }),
);

router.post(
  '/:id/borrow/:bookId',
  middlewares.wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const book = await userService.borrowBook(Number(req.params.id), Number(req.params.bookId));
    return res.json(book).status(200);
  }),
);

router.post(
  '/:id/return/:bookId',
  celebrate({
    body: Joi.object({
      score: Joi.number(),
    }),
  }),
  middlewares.wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const book = await userService.returnBook(
      Number(req.params.id),
      Number(req.params.bookId),
      req.body.score,
    );
    return res.json(book).status(200);
  }),
);

export default router;
