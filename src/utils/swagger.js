const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config()
const doc = {

  info: {
    title: 'PIII- test',
    description: 'Aplicacion inicial de backend',
  },
  host: 'localhost:' + process.env.PORT
};

const outputFile = '../../swagger-output.json';
const routes = [

  "src/modules/task/task.routes.js",
  "src/modules/user/user.routes.js",
];

swaggerAutogen(outputFile, routes, doc);

// const outputFile = '../../swagger-output.json';
// const endpointsFiles = [
//   './src/modules/task/task.routes.js',  
//   './src/modules/user/user.routes.js', 
// ];

