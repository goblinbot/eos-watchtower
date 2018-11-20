import { App } from "../app";
import * as Config from '../../_config/config.json';
import * as SocketIO from 'socket.io';
import * as http from 'http';
import { Express } from 'express';


const PORT = (Config.port ? Config.port : 3000);

export class Server {
    private static server: http.Server;
    private static application: Express;
    private static websockets: SocketIO.Server;

    public create(app: App): void {
        Server.application = app.application;
        Server.application.set('port', PORT);

        Server.server = http.createServer(Server.application);
        Server.websockets = SocketIO(Server.server, {
            path: '/api/io',
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        });

        Server.server.listen(PORT);
        Server.server.on('listening', Server.onListening);
        Server.websockets.on('connection', (socket) => {
            console.log('[IO] Socket connected');
        });
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
        console.log('(==)')
        console.log(' ## ');
        console.log(` ##   { ${Config.name.toUpperCase()} }`);
        console.log(' ##');
        console.log('/##\\_____________________\n');
        console.log('# Initialising ..');
        console.log('# Loading dependancies ..');
        console.log('-------------------------');
        console.log(`Listening on: ${bind}`);
        console.log('-------------------------');
    }

}
