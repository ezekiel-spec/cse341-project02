const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actors');
// const validation = require('../middleware/validate'); // Uncomment after creating validation middleware

router.get('/', actorsController.getAll);
router.get('/:id', actorsController.getSingle);

router.post('/', actorsController.createActor); // Add validation.saveActor here later
router.put('/:id', actorsController.updateActor);
router.delete('/:id', actorsController.deleteActor);

module.exports = router;