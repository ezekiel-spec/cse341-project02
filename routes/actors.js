const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');
// 1. Import the authentication gatekeeper
const { isAuthenticated } = require('../middleware/authenticate');

// --- Public Routes ---
// These are open to everyone (no login required)
router.get('/', actorsController.getAll);
router.get('/:id', actorsController.getSingle);

// --- Protected Routes ---
// These now require the user to be logged in via GitHub
// Added 'isAuthenticated' as middleware before the controller logic
router.post('/', isAuthenticated, actorsController.createActor); 
router.put('/:id', isAuthenticated, actorsController.updateActor);
router.delete('/:id', isAuthenticated, actorsController.deleteActor);

module.exports = router;