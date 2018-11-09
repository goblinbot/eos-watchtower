// define routes
import statusRoutes from './routes/status.route';

// Configure Express.
import { Express } from 'express';
import * as express from 'express';
import * as SocketIO from 'socket.io';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

export class App {
    private static app: Express = express();
    private static websockets: SocketIO.Server;

    constructor() {
        this.initialize();
    }

    public get application(): Express {
        return App.app;
    }

    public get socketio(): SocketIO.Server {
        return App.websockets;
    }

    public set socketio(server: SocketIO.Server) {
        App.websockets = server;
    }

    private initialize(): void {
        this.setExpress();
    }

    private setExpress(): void {
        App.app.use(bodyParser.json());
        App.app.use(cors());
        App.app.use(bodyParser.urlencoded({ extended: false }));
    }

}
