// Time to use Express, and related dependancies! 
const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');

// define routes
const statusRoutes = require('./routes/status.route');

// Configure Express.
const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));

    // add routes to express
    app.use('/status', statusRoutes);

// Configure socket.io / The Websocket.
const http  = require('http').Server(app);
const io    = require('socket.io')(http);

// Grab the remaining dependancies.
const fs = require('fs');
const globalConfig = require('./_config/config.js');

// Run the server! combine the process command with the port found in CONFIG.
const port = process.env.PORT || globalConfig.sys.port;


// Event: WATCHTOWER START
http.listen(port, function () {

    /* flavor text */
    console.log('\n  |>');
    console.log(' _| ');
    console.log('[==]')
    console.log(' || ');
    console.log(` || { ${globalConfig.sys.name.toUpperCase()} }`);
    console.log(' ||');
    console.log('/VV\\_____________\n');
    console.log('# Initialising ..');
    console.log('# Loading dependancies ..');
    console.log('-------------------------');
    console.log(`@ IP: ${globalConfig.sys.localaddress}:${globalConfig.sys.port} \n@ ./: 127.0.0.1:${globalConfig.sys.port}`);
    console.log('-------------------------');

    console.log(`# ${globalConfig.sys.name} active. `);

});



// default message when visiting.
app.get('/', function (req, res) {
    res.send('Welcome to the WatchTower API');
});