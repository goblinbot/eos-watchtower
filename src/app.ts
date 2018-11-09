// define routes
import statusRoutes from './routes/status.route';

// Configure Express.
import { Express } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
// const app = express();
//     app.use(bodyParser.json());
//     app.use(cors());
//     app.use(bodyParser.urlencoded({ extended: false }));

//     // add routes to express
//     app.use('/status', statusRoutes);

// // Configure socket.io / The Websocket.
// const http  = require('http').Server(app);
// const io    = require('socket.io')(http);

// // Grab the remaining dependancies.
// import * as fs from 'fs';
// const globalConfig = require('../_config/config.js');

// // Run the server! combine the process command with the port found in CONFIG.
// const port = process.env.PORT || globalConfig.sys.port;


// // Event: WATCHTOWER START
// http.listen(port, function () {

//     /* flavor text */
//     console.log('  .');
//     console.log('  |>');
//     console.log(' _|');
//     console.log('(==)')
//     console.log(' ## ');
//     console.log(` ##   { ${globalConfig.sys.name.toUpperCase()} }`);
//     console.log(' ##');
//     console.log('/##\\_____________________\n');
//     console.log('# Initialising ..');
//     console.log('# Loading dependancies ..');
//     console.log('-------------------------');
//     console.log(`@ IP: ${globalConfig.sys.localaddress}:${globalConfig.sys.port} \n@ ./: 127.0.0.1:${globalConfig.sys.port}`);
//     console.log('-------------------------');

//     console.log(`# ${globalConfig.sys.name} active. `);

// });



// // default message when visiting.
// app.get('/', function (req, res) {
//     res.send(`Welcome to the ${globalConfig.sys.name} API`);
// });

export class App {

}
