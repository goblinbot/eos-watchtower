// WEATHER JSON API FOR VERY NEAR LOCATION, MAX 300 REQUESTS PER 24 HOURS
// http://weerlive.nl/api/json-data-10min.php?key=d2a2b44c24&locatie=Eijsden

import { Router } from 'express';
import { WeatherController } from '../modules/weather/weather.controller';
import * as Config from '../../_config/config.json';
import * as request from "request";

export class ExternalRoutes {

}

// Routes for the Weather API
export class WeatherRoutes {
    /** @returns {Router} */
    public static getRoutes(): Router {
        const router = Router();
        const options = {
            uri: Config.weather.api_url,
            json: true
        };

        // get current
        router.route('/').get((req, res) => {
            // check if a WEATHER REPORT is already set. If not, request LiveWeer data.
            if(!WeatherController.currentWeather) {
                request.get(options, (error, result, body) => {
                    if (!error && result.statusCode === 200) {
                        res.status(200).send(WeatherController.setCurrentWeather(body));
                    } else {
                        res.status(result.statusCode).send({ message: 'error', status: result.statusCode });
                    }
                })
            } else {
                // return the already cached weather.
                res.status(200).send(WeatherController.currentWeather);
            }
        });

        console.log('[RO] ..Weather Routes added.');
        return router;
    }
}
