import { App } from "../app";
import * as Config from '../../_config/config.json';
import * as SocketIO from 'socket.io';
import * as http from 'http';
import { Express } from 'express';
import * as ip from 'ip';
import * as mongoose from 'mongoose';

const PORT = (Config.port ? Config.port : 3000);
const IP = ip.address();

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
