const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const host = '127.0.0.1';
app.use(express.json());

// ** Send method only sends text
// app.get('/', (req, res) => {
//   res.status(200).send('First API call with Express JS');
// });

// ** JSON method allows sending JSON to client
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'First API call with Express JS',
//     appName: 'Natours API',
//   });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can send data on this API');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// For normal api route
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

// For dynamic API route
app.get('/api/v1/tours/:id', (req, res) => {
  // ** Gives us dynamic parameters of the requested path
  // console.log(req.params);
  const id = req.params.id * 1;
  // check if the id exists, if it doesn't send an error response
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((el) => el.id === id);

  // ** If the id exists, send the response
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
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
  // res.end('Done');
});

app.listen(port, host, () => {
  console.log('App running on this port');
});
