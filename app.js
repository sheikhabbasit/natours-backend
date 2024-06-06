const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const host = '127.0.0.1';

// ** App.use introduces middlewares which sit between each and every request and helps to process them or modify them as well
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware: ', req.body);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// app.get('/api/v1/tours', getAllTours());
// app.post('/api/v1/tours', addNewTour());
// app.get('/api/v1/tours/:id', getTourById());
// app.patch('/api/v1/tours/:id', updateTour());
// app.delete('/api/v1/tours/:id', deleteTour());

app.route('/api/v1/tours').get(getAllTours()).post(addNewTour());

app
  .route('/api/v1/tours/:id')
  .patch(updateTour())
  .delete(deleteTour())
  .get(getTourById());

app.listen(port, host, () => {
  console.log('App running on this port');
});
