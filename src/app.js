const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _config = require('./configs/config.json');
const App = express();

// initialize & add POST API routes
require('./routes/')(App);

// setup initial CORS and bodyParsing
App.use(cors);
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: false}));

// setup additional CORS handling
App.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Boot
App.listen(3003, () => console.log('.][. Welcome to WatchTower .][.'));

module.exports = {
  App
};
