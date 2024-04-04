import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import UserService from '../../../services/users';
import books from '../books';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get(
    '/',
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = Container.get(UserService);
        const users = await userService.findAll();
        return res.json(users).status(200);
      } catch (error) {
        return next(error);
      }
    },
  );

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userService = Container.get(UserService);
      const user = await userService.findOneById(req.params?.id as unknown as number);
      return res.json(user || {}).status(200);
    } catch (error) {
      return next(error);
    }
  });

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        name: Joi.string().min(2).max(30).required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = Container.get(UserService);
        const user = await userService.create(req.body);
        return res.json(user).status(201);
      } catch (e) {
        return next(e);
      }
    },
  );

  route.post('/:id/borrow/:bookId', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userService = Container.get(UserService);
      const book = await userService.borrowBook(Number(req.params.id), Number(req.params.bookId));
      return res.json(book).status(200);
    } catch (e) {
      return next(e);
    }
  });

  route.post(
    '/:id/return/:bookId',
    celebrate({
      body: Joi.object({
        score: Joi.number(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = Container.get(UserService);
        const book = await userService.returnBook(
          Number(req.params.id),
          Number(req.params.bookId),
          req.body.score,
        );
        return res.json(book).status(200);
      } catch (e) {
        return next(e);
      }
    },
  );
};
