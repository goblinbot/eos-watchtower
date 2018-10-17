// Time to use Express, and related dependancies! 
const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');

// Configure Express.
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure socket.io / The Websocket.
const http  = require('http').Server(app);
const io    = require('socket.io')(http);

// Grab the remaining dependancies.
const ip = require('ip');
const fs = require('fs');
const globalSettings = require('./_config/config.js');

// Run the server! using PORT 5000 by default. Command in terminal: 'node app' 
const port = process.env.PORT || 5000;

// Event: WATCHTOWER START
http.listen(port, function () {

    /* flavor text */
    console.log('\n  |>');
    console.log(' _| ');
    console.log('[==]')
    console.log(' || ');
    console.log(' || { WATCHTOWER }');
    console.log(' ||');
    console.log('/VV\\_____________\n');
    console.log('# Initialising ..');
    console.log('# Loading dependancies ..');
    console.log('-------------------------');

});



// default message when visiting.
app.get('/', function (req, res) {
    res.send('Welcome to the WatchTower API');
});