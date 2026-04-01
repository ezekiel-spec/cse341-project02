const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
// Step 1: Import the authentication middleware
const { isAuthenticated } = require('../middleware/authenticate');

// --- Public Routes ---
// Anyone (logged in or not) can view the movies
router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);

// --- Protected Routes ---
// Only users who have logged in via GitHub can use these
router.post('/', isAuthenticated, moviesController.createMovie);
router.put('/:id', isAuthenticated, moviesController.updateMovie);
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;