import { Express } from 'express';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import SocketIO from 'socket.io';
import { Routes } from './routes';
const config = require('../_config/config.json');

import { WeatherController } from './modules/weather/weather.controller';
import { FobController } from './modules/fob/fob.controller';
import { MissionController } from './modules/mission/mission.controller';

export class App {

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
        App.websockets.use(cors());
    }

    // init modules.. move to other file?
    private initModules() {
        if (config.weather.enabled) {
            WeatherController.init();
        }
        FobController.init();
        MissionController.init();
    }

    constructor() {
        console.log('# Loading dependancies ..');
        App.app = express();
        this.config();
        this.setCrossOriginResourceSharing();
        this.loadRoutes();
        this.initModules();
    }

    private config(): void {
        App.app.use(cors());
        App.app.use(bodyParser.json());
        App.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private loadRoutes(): void {
        App.app = Routes.initialize(App.app);
    }

    private setCrossOriginResourceSharing(): void {
        App.app.disable('x-powered-by');
        App.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, withCredentials');
            next();
        });
    }

}
