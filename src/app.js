const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _config = require('./configs/config.json');
class App {
  app;

  constructor() {
    this._configureExpress();
    this._setCrossOriginResourceSharing();
    this._initRouter();
    this._initControllers();
    console.log('[X]. EOCONSTRUCT');
  }

  _configureExpress = () => {
    this.app = express();
    this.app.use(cors);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
  }

  _setCrossOriginResourceSharing = () => {
    this.app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }); 
  }

  _initRouter = () => 1;
  _initControllers = () => 1;
}

module.exports = {
  App
};
