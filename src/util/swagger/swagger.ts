import {_schema} from './build/_schema';
const swaggerAutogen = require('swagger-autogen')();

require('dotenv').config()

const doc = {
  info: {
    version: '1.0.0',
    title: 'Invent Analytics Library API',
    description: 'Library API',
  },
  host: 'localhost:3000',      
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  schemas: _schema.definitions
  // tags: [
  //   {
  //     name: 'root',
  //     description: 'Application endpoints for testing',
  //   }, 
  //   {
  //     name: 'insurances',
  //     description: 'Insurance endpoints for retrieving information',
  //   },
  // ],
};

const outputFile = 'src/util/swagger/build/swagger.json';
const endpointsFiles = ['src/api/routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc)