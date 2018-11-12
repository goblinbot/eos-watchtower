import { Express, Request, Response, Router } from 'express';
import { Beacon } from './routes/beacon';
import * as fs from 'fs';

export class Routes {

    public static initialize(app: Express): Express {
        console.log('The routes are being initialize');
        return Routes.getRoutes(app);
    }

    private static getRoutes(app: Express): Express {

        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send('Welcome to the WatchTower API.');
        });

        app.route('/api/').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'WatchTower online'
            });
        });

        app.use('/api/beacon', Beacon.getRoutes());
        app.use('*', Routes.errorHandler);

        return app;
    }

    private static errorHandler(req: Request, res: Response): void {
        console.error(`Page not found, returning 404: ${req.method}:${req.originalUrl}`);
        res.status(404).send('Not found');
    }
}
