import { Express } from 'express';
import * as http from 'http';
import * as SocketIO from 'socket.io';
import { App } from '../app';
import * as Config from '../../_config/config.json';

export class Server {
    private static server: http.Server;
    private static application: Express;
    private static websockets: SocketIO.Server;
    private port = Server.setPort();

    /**
     * @description Sets the port to {Config.port} OR 3000 by default.
     */
    private static setPort(): any {
        const _port = Config.port ? Config.port : 3000;
        return process.env.PORT || _port;
    }

    /**
     * @returns {SocketIO.Server}
     */
    public static socketio(): SocketIO.Server {
        return Server.websockets;
    }

    private static onListening(): void {
        const address = Server.server.address();
        const bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;

        /* flavor text */
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
        console.log(`@ Listening on ${bind}`);
        console.log('-------------------------');

        console.log(`# ${Config.name} active. `);
    }

    public create(app: App): void {
        Server.application = app.application;
        Server.application.set('port', this.port);

        console.log(Server.application);

        Server.server = http.createServer(Server.application);

        // websocket settings.
        Server.websockets = SocketIO(Server.server, {
            path: '/api/io',
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        });

        // activate!
        Server.server.listen(this.port);
        Server.server.on('listening', Server.onListening);
    }

}
