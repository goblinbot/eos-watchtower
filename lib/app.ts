import { Express } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as SocketIO from 'socket.io';
import { Routes } from './routes';

export class App {

    // public app: express.Application;
    public static app: Express = express();
    private static websockets: SocketIO.Server;


    public get application(): Express {
        return App.app;
    }

    public get socketio(): SocketIO.Server {
        return App.websockets;
    }

    public set socketio(server: SocketIO.Server) {
        App.websockets = server;
    }

    constructor() {
        App.app = express();
        this.config();
        this.loadRoutes();
    }

    private config(): void {
        App.app.use(bodyParser.json());
        App.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private loadRoutes(): void {
        App.app = Routes.initialize(App.app);
    }

}
