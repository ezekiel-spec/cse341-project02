const express = require('express');
const router = express.Router();

// Changed '../swagger' to './swagger-router'
// This ensures we stay in the routes folder and get the Middleware, not the Object
router.use('/', require('./swagger-router')); 

router.use('/movies', require('./movies'));
router.use('/actors', require('./actors'));

module.exports = router;