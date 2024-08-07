const express = require('express');

const {
  getAllTours,
  getTourById,
  addNewTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats
} = require('../controllers/tourController');

const router = express.Router();

// router.param('id', checkID);

router.route('/top-5-cheap').get(aliasTopTours(), getAllTours());

router.route('/tour-stats').get(getTourStats());

router
  .route('/')
  .get(getAllTours())
  .post(addNewTour());
router
  .route('/:id')
  .patch(updateTour())
  .delete(deleteTour())
  .get(getTourById());

module.exports = router;
