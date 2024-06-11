const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// ** App.use introduces middlewares which sit between each and every request and helps to process them or modify them as well

// ** Middlewares
// app.use(morgan('dev'));

app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Hello from the middleware: ', req.body);
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// app.get('/api/v1/tours', getAllTours());
// app.post('/api/v1/tours', addNewTour());
// app.get('/api/v1/tours/:id', getTourById());
// app.patch('/api/v1/tours/:id', updateTour());
// app.delete('/api/v1/tours/:id', deleteTour());

// ** Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
