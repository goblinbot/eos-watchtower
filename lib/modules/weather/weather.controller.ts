import { WeatherData } from '../../bin/models/weather';
import * as Config from '../../../_config/config.json';
import * as request from "request";
import { Server } from '../../bin/server';
const CronJob = require('cron').CronJob;

export class WeatherController {

    public static currentWeather: WeatherData;
    private static options = {
        uri: Config.weather.api_url,
        json: true
    };

    /**
     * @description Initialise the WeatherController
     */
    public static init(): void {
        if (Config.weather.api_url) {
            console.log('[*CRON] WeatherUpdate cron set to repeat every 15th minute.');
            this.updateWeatherRepeater.start();

            if(!this.currentWeather) {
                this.getLiveWeatherData();
            }
        }
    }

    /**
     * @description Get weather data from the API, push it through to setCurrentWeather
     */
    public static getLiveWeatherData(): void {
        request.get(this.options, (error, result, body) => {
            if (!error && result.statusCode === 200) {
                WeatherController.setCurrentWeather(body);
            } else {
                console.error(`ERR: getLiveWeatherData => error: ${error}`);
            }
        });
    }

    /**
     * @description Sets the currentWeather, and also..
     * @returns {WeatherData} to allow for the callback-like-code to continue.
     */
    public static setCurrentWeather(inputJson: any): WeatherData {
        if (inputJson.liveweer[0]) {
            this.currentWeather = this.convertToWeatherData(inputJson.liveweer[0]);
            WeatherController.onWeatherUpdate();
            return this.currentWeather;
        } else {
            console.error('ERR: liveweer[0] missing');
            return;
        }
    }

    /**
     * @description converts incoming JSON from LiveWeer to our WeatherData Model
     * @returns {weather: WeatherData}
     */
    public static convertToWeatherData(inputJson: any): WeatherData {
        const weather = new WeatherData();
            weather.lastUpdated = Date.now();
            weather.temperature = inputJson.temp;
            weather.windkmh = inputJson.windKmh;
            weather.windDirection = inputJson.windr;
            weather.sunUp = inputJson.sup;
            weather.sunDown = inputJson.sunder;
            weather.tempMin = inputJson.d0tmin;
            weather.tempMax = inputJson.d0tmax;
            weather.chanceOfRain = inputJson.d0neerslag;
            weather.tempMinNext = inputJson.d1tmin;
            weather.tempMaxNext = inputJson.d1tmax;
            weather.chanceOfRainNext = inputJson.d1neerslag;
        return weather;
    }

    /**
     * @description Sets a CronJob to update the weather automatically every 15 minutes.
     */
    private static updateWeatherRepeater = new CronJob('*/15 * * * *', function () {
        console.log(`[*CRON] trigger: updateWeatherRepeater, ${new Date()}`);
        WeatherController.getLiveWeatherData();
    });

    /**
     * @description tell everyone the weather updated, sends the new prediction after it as well.
     */
    public static onWeatherUpdate(): void {
        Server.socketio().sockets.emit('weatherUpdate', this.currentWeather);
    }

}
