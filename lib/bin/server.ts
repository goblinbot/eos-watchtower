import { App } from '../app';
import SocketIO = require('socket.io');
import http = require('http');
import https = require('https');
import { Express } from 'express';
import mongoose = require('mongoose');
import { readFileSync } from 'fs';
const config = require('../../_config/config.json');

const PORT = config.port ? config.port : 3000;
let SSLOPTIONS;

if (config.ssl.enabled) {
    SSLOPTIONS = {
        key: readFileSync(config.ssl.key_path),
        cert: readFileSync(config.ssl.cert_path),
    };
}

export class Server {
    private static server: http.Server;
    private static application: Express;
    private static websockets: SocketIO.Server;

    public create(app: App): void {
        Server.application = app.application;
        Server.application.set('port', PORT);

        // mongoose.Promise = global.Promise;
        try {
            mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
                console.log('[&MONG] Database is connected');
            });
        } catch (error) {
            console.log('[&MONG] Can not connect to the database' + error);
        }

        Server.server = http.createServer(Server.application);
        Server.websockets = SocketIO(Server.server);

        Server.server.listen(process.env.PORT || PORT);
        Server.websockets.on('connection', (socket) => {
            // console.log('[.IO] Socket connection established.');
        });
        Server.server.on('listening', Server.onListening);

        if (config.ssl.enabled) {
            const httpsServer = https.createServer(SSLOPTIONS, Server.application);

            httpsServer.listen(config.ssl.port, () => {
                console.log(`HTTPS server ALSO running on ${config.ssl.port}`);
            });
        }
    }

    public static socketio(): SocketIO.Server {
        return Server.websockets;
    }

    private static onListening(): void {
        console.log('  .');
        console.log('  |>');
        console.log(' _|');
        console.log('(\x1b[33m==\x1b[0m)');
        console.log(' ## ');
        console.log(` ##   { ${config.name.toUpperCase()} }`);
        console.log(' ##');
        console.log('/##\\_____________________\n');
        console.log('# Initialising ..');
        console.log(`Listening on port: \x1b[36m${PORT}\x1b[0m`);
        console.log('-------------------------');
    }
}
