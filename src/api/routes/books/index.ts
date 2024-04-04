import { NextFunction, Request, Response, Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Container } from 'typedi';
import middlewares from '../../middlewares';
import BookService from '../../../services/books';

const route = Router();

export default (app: Router) => {
  app.use('/books', route);

  route.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookService = Container.get(BookService);
      const books = await bookService.findAll();
      return res.json(books).status(200);
    } catch (error) {
      return next(error);
    }
  });

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookService = Container.get(BookService);
      const book = await bookService.findOneById(req.query?.id as unknown as number);
      return res.json(book || {}).status(200);
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
        const bookService = Container.get(BookService);
        const book = await bookService.create(req.body);
        return res.json(book).status(201);
      } catch (e) {
        return next(e);
      }
    },
  );

};
