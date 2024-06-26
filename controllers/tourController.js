const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkID = (req, res, next, val) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

const getAllTours = () => {
  return (req, res) => {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  };
};

const getTourById = () => {
  return (req, res) => {
    const id = req.params.id * 1;

    const tour = tours.find(el => el.id === id);

    res.status(200).json({
      status: 'success',
      data: { tour }
    });
  };
};

const addNewTour = () => {
  return (req, res) => {
    const id = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id }, req.body);
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      () => {
        res.status(201).json({
          status: 'Write successful',
          data: {
            tours: newTour
          }
        });
      }
    );
  };
};

const updateTour = () => {
  return (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: 'Updated tour'
      }
    });
  };
};

const deleteTour = () => {
  return (req, res) => {
    res.status(204).json({
      status: 'success',
      data: null
    });
  };
};

module.exports = {
  getAllTours,
  getTourById,
  addNewTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody
};
