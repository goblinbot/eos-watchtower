// WEATHER JSON API FOR VERY NEAR LOCATION, MAX 300 REQUESTS PER 24 HOURS
// http://weerlive.nl/api/json-data-10min.php?key=d2a2b44c24&locatie=Eijsden

import { Router } from 'express';
import { WeatherController } from '../modules/weather/weather.controller';

// Routes for the Weather API/Module
export class WeatherRoutes {
    /** @returns {Router} */
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
