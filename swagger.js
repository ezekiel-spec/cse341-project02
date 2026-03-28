const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Media Library API',
    description: 'CSE341 Project 2 - Media Library'
  },
  // UPDATED: Points to your active project02 URL
  host: 'cse341-project02-urrq.onrender.com', 
  schemes: ['https']
};

const outputFile = './swagger-output.json';
// Tells the generator to follow the routes starting from index.js
const endpointsFiles = ['./routes/index.js']; 

// Generate the documentation
swaggerAutogen(outputFile, endpointsFiles, doc);