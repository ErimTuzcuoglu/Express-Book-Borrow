import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


// @TODO Make Routes like this
// export class AuthRoutes {
//   constructor(@Inject(AuthService) private authService: AuthService) {}
// }

export default (app) => {
  const options = {
    swaggerDefinition: {
      restapi: '3.0.0',
      info: {
        title: 'Invent Analytics Library API',
        version: '1.0.0',
        description: 'Library API',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: [`**/*.js|**/*.ts`],
  };
  const specs = swaggerJsdoc(options);

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
};
