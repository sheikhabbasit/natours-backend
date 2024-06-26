const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: `${__dirname}/config.env` });

const port = process.env.PORT || 8000;

const host = '127.0.0.1';

app.listen(port, host, () => {
  console.log('App running on this port');
});
