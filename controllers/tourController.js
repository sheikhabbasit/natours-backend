const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = () => {
  return (req, res) => {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  };
};

const getTourById = () => {
  return (req, res) => {
    console.log(req.requestTime);
    const id = req.params.id * 1;
    if (id > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }

    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
      status: 'success',
      data: { tour },
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
      (err) => {
        res.status(201).json({
          status: 'Write successful',
          data: {
            tours: newTour,
          },
        });
      }
    );
  };
};

const updateTour = () => {
  return (req, res) => {
    if (req.params.id > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour: 'Updated tour',
      },
    });
  };
};

const deleteTour = () => {
  return (req, res) => {
    if (req.params.id > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  };
};

module.exports = {
  getAllTours,
  getTourById,
  addNewTour,
  updateTour,
  deleteTour,
};
