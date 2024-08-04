import bodyParser from 'body-parser';
import { errors, celebrate, isCelebrateError } from 'celebrate';
import cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';
/* #region Swagger */
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../util/swagger/build/swagger.json');
/* #endregion */
import routes from '../api/routes';

export default (app: express.Application) => {
  app
  .enable('trust proxy')
  .use(cors())
  .use(helmet())
  .use(bodyParser.json())
  .use(errors());

  /* #region Swagger */
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  /* #endregion */
  app.use(routes);

  /// catch 404 and forward to error handler
  app.use((err, req, res, next) => {
    const error: Error = new Error('Not Found');
    error['status'] = 404;
    next(error);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }

    /**
     * Handle validation error thrown by Celebrate + Joi
     */
    if (isCelebrateError(err)) {
      return res.status(422).send({ message: err.message, details: err.details }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'development' && err.status === 404 && req.originalUrl === '/') {
      res.redirect('/swagger');
    }
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
