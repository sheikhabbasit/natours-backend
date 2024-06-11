const express = require('express');

const {
  getAllTours,
  getTourById,
  addNewTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(getAllTours()).post(addNewTour());
router
  .route('/:id')
  .patch(updateTour())
  .delete(deleteTour())
  .get(getTourById());

module.exports = router;
