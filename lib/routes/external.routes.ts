/**
 * @description EXTERNAL ROUTES is defined as routes that use external/online data.
 */

import { Router } from 'express';
import { WeatherController } from '../modules/weather/weather.controller';

export class WeatherRoutes {
    public static getRoutes(): Router {
        const router = Router();

        /**
         * @description get the current Weather. */
        router.route('/').get((req, res) => {
            res.status(200).send(WeatherController.currentWeather);
        });

        /** @description update route: Force the weather to update. */
        router.route('/update').get((req, res) => {
            console.log('[WT] Manual weather update called.');
            WeatherController.getLiveWeatherData();
            res.status(200).send({ message: 'Manual weather update called. '});
        });

        console.log('[RO] ..Weather Routes added.');
        return router;
    }
}
