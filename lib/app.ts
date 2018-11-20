import { Express } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as SocketIO from 'socket.io';
import { Routes } from './routes';
import * as Config from '../_config/config.json';

import { WeatherController } from './modules/weather/weather.controller';

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

    private initWeatherModule() {
        if (Config.weather.enabled) {
            WeatherController.init();
        }
    }

    constructor() {
        App.app = express();
        this.config();
        this.loadRoutes();
        this.initWeatherModule();
    }

    private config(): void {
        App.app.use(bodyParser.json());
        App.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private loadRoutes(): void {
        App.app = Routes.initialize(App.app);
    }

}
