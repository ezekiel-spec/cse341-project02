const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Media Library API',
    description: 'CSE341 Project 2 - Media Library'
  },
  // Ensure this host matches your Render URL (without the https://)
  host: 'cse341-project2-1-gx2y.onrender.com', 
  schemes: ['https']
};

const outputFile = './swagger-output.json';
// This tells the generator to follow the trail starting from your main router
const endpointsFiles = ['./routes/index.js']; 

/* NOTE: if you use the "render" version of the host, 
   the swagger-ui will use that for its "Try it out" calls. */

// Generate the documentation
swaggerAutogen(outputFile, endpointsFiles, doc);