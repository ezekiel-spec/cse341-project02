const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
// The ../ tells Node to look outside the 'routes' folder to the root
const swaggerDocument = require('../swagger-output.json'); 

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;