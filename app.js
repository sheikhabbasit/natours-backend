const express = require('express');

const app = express();
const port = 3000;
const host = '127.0.0.1';

// ** Send method only sends text
// app.get('/', (req, res) => {
//   res.status(200).send('First API call with Express JS');
// });

// ** JSON method allows sending JSON to client
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'First API call with Express JS',
    appName: 'Natours API',
  });
});

app.post('/', (req, res) => {
  res.status(200).send('You can send data on this API');
});

app.listen(port, host, () => {
  console.log('App running on this port');
});
