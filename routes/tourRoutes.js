const express = require('express');

const {
  getAllTours,
  getTourById,
  addNewTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require('../controllers/tourController');

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllTours()).post(checkBody, addNewTour());
router
  .route('/:id')
  .patch(updateTour())
  .delete(deleteTour())
  .get(getTourById());

module.exports = router;
