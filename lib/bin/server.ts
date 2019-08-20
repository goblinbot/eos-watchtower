import { App } from "../app";
import Config from '../../_config/config.json';
import SocketIO from 'socket.io';
import http from 'http';
import https from 'https';
import { Express } from 'express';
import ip from 'ip';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';

const PORT = (Config.port ? Config.port : 3000);
const IP = ip.address();
let SSLOPTIONS;

if (Config.ssl.enabled) {
    SSLOPTIONS = {
        key: readFileSync(Config.ssl.key_path),
        cert: readFileSync(Config.ssl.cert_path)
    }
}



export class Server {
    private static server: http.Server;
    private static application: Express;
    private static websockets: SocketIO.Server;

    public create(app: App): void {
        Server.application = app.application;
        Server.application.set('port', PORT);


        // mongoose.Promise = global.Promise;
        mongoose.connect(Config.db, { useNewUrlParser: true }).then(
            () => { console.log('[&MONG] Database is connected') },
            err => { console.log('[&MONG] Can not connect to the database' + err) }
        );

        Server.server = http.createServer(Server.application);
        Server.websockets = SocketIO(Server.server);

        Server.server.listen(PORT);
        Server.websockets.on('connection', (socket) => {
            // console.log('[.IO] Socket connection established.');
        });
        Server.server.on('listening', Server.onListening);


        if (Config.ssl.enabled) {
            const httpsServer = https.createServer(SSLOPTIONS, Server.application);

            httpsServer.listen(Config.ssl.port, () => {
                console.log(`HTTPS server ALSO running on ${Config.ssl.port}`);
            });
        }
    }

    public static socketio(): SocketIO.Server {
        return Server.websockets;
    }

    private static onListening(): void {
        const address = Server.server.address();
        const bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;
        console.log('  .');
        console.log('  |>');
        console.log(' _|');
        console.log('(\x1b[33m==\x1b[0m)')
        console.log(' ## ');
        console.log(` ##   { ${Config.name.toUpperCase()} }`);
        console.log(' ##');
        console.log('/##\\_____________________\n');
        console.log('# Initialising ..');
        console.log(`IP: \x1b[36m${IP}\x1b[0m`)
        console.log(`Listening on: \x1b[36m${bind}\x1b[0m`);
        console.log('-------------------------');
    }

}
