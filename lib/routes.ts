import { Express, Request, Response } from 'express';
import express = require('express');
import { BeaconRouter } from './routes/beacon.routes';
import { TimeRoutes } from './routes/time.routes';
import { SecLevel } from './routes/security.routes';
import { PortalRoutes } from './routes/portal.routes';
import { WeatherRoutes } from './routes/external.routes';
import { FobRoutes } from './routes/fob.routes';
import { MissionRoutes } from './routes/mission.routes';
const config = require('../_config/config.json');

export class Routes {

    constructor() { }

    public static initialize(app: Express): Express {
        console.log('[RO] Setting up (API) routes');
        return Routes.getRoutes(app);
    }

    private static getRoutes(app: Express): Express {

        // Start with the default 'landing'.
        app.use(express.static('public'));

        app.route('/').get((req: Request, res: Response) => {
            res.sendFile('index.html', { "root": __dirname + '/public/' });
        });

        app.route('/api/').get((req: Request, res: Response) => {
            res.status(200).send({ message: `Welcome to the ${config.name} API.` });
        });

        // Most routes are always enabled by default.
        app.use('/api/beacon', BeaconRouter.getRoutes());
        app.use('/api/time', TimeRoutes.getRoutes());
        app.use('/api/security', SecLevel.getRoutes());
        app.use('/api/fob', FobRoutes.getRoutes());
        app.use('/api/missions', MissionRoutes.getRoutes());
        app.use('/api/portal', PortalRoutes.getRoutes());

        // use the weather module, if enabled in config.json
        if (config.weather.enabled) {
            app.use('/api/weather', WeatherRoutes.getRoutes());
        }

        // Use an error handler in all remaining cases.
        app.use('*', Routes.errorHandler);

        console.log('\x1b[32m[RO] Routes done loading.\x1b[0m');
        return app;
    }

    private static errorHandler(req: Request, res: Response): void {
        console.error(`Page not found, returning 404: ${req.method}:${req.originalUrl}`);
        res.status(404).send('Not found');
    }
}
