const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// const checkID = (req, res, next, val) => {
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

// ** No more needed as mongoose is going to take care of it
// const checkBody = (req, res, next) => {
//   if (!req.body.name) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

const aliasTopTours = () => {
  return (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  };
};

const getAllTours = () => {
  return async (req, res) => {
    try {
      // ** 1. Filtering
      // const queryObj = { ...req.query };
      // console.log(req.query);
      // const excludedFields = ['page', 'sort', 'limit', 'fields'];
      // excludedFields.forEach(el => delete queryObj[el]);

      // ** 2. Advanced filtering
      // const queryStr = JSON.stringify(queryObj);
      // const queryStrCopy = queryStr.replace(
      //   /\b(gte|gt|lte|lt)\b/g,
      //   match => `$${match}`
      // );

      // let query = Tour.find(JSON.parse(queryStrCopy));

      // ** 3. Sorting
      // if (req.query.sort) {
      //   const sortBy = req.query.sort.split(',').join(' ');
      //   query = query.sort(sortBy);
      // } else {
      //   query = query.sort('-createdAt');
      // }

      // ** 4. Field limiting
      // if (req.query.fields) {
      //   const fields = req.query.fields.split(',').join(' ');
      //   query = query.select(fields);
      // } else {
      //   query = query.select('-__v');
      // }

      // ** Execute query
      const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const tours = await features.query;

      // ** Filtering in another way
      // const tours = await Tour.find()
      //   .where('duration')
      //   .equals(req.query.duration)
      //   .where('difficulty')
      //   .equals(req.query.difficulty);

      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: { tours }
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail',
        message: 'Failed to fetch tours'
      });
    }
  };
};

const getTourById = () => {
  return async (req, res) => {
    try {
      const tour = await Tour.findById(req.params.id);
      // tour.findOne({ _id: req.params.id });zzzzzzzzzzzzzzzza

      res.status(200).json({
        status: 'success',
        data: { tour }
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail',
        message: 'Failed to fetch tour'
      });
    }

    // const tour = tours.find(el => el.id === id);
  };
};

const addNewTour = () => {
  return async (req, res) => {
    try {
      const newTour = await Tour.create(req.body);
      res.status(201).json({
        status: 'Write successful',
        data: {
          tour: newTour
        }
      });
    } catch (e) {
      res.status(400).json({
        status: 'Saving failed',
        message: e || 'Trying to save invalid data or duplicate data'
      });
    }
  };
};

const updateTour = () => {
  return async (req, res) => {
    try {
      const updatedTour = await Tour.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour
        }
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail',
        message: 'Failed to update tour'
      });
    }
  };
};

const deleteTour = () => {
  return async (req, res) => {
    try {
      await Tour.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: 'Successfully deleted tour',
        data: null
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail',
        message: 'Failed to delete tour'
      });
    }
  };
};

const getTourStats = () => {
  return async (req, res) => {
    try {
      const stats = await Tour.aggregate([
        {
          $match: {
            ratingsAverage: {
              $gte: 4.5
            }
          }
        },
        {
          $group: {
            _id: '$difficulty',
            avgRating: { $avg: '$ratingsAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },
            numRatings: { $sum: '$ratingsQuantity' },
            numTours: { $sum: 1 }
          }
        },
        {
          $sort: {
            avgPrice: 1
          }
        }
        // {
        //   $match: {
        //     _id: { $ne: 'easy' }
        //   }
        // }
      ]);
      res.status(200).json({
        status: 'success',
        data: { stats }
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: 'fail',
        message: 'Failed to delete tour'
      });
    }
  };
};

module.exports = {
  getAllTours,
  getTourById,
  addNewTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats
  // checkID,
  // checkBody
};
