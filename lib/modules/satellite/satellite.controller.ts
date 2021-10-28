import APOD from '../../bin/models/SatelliteData/APOD';
import request = require('request');
import { Server } from '../../bin/server';
import NeoWs from '../../bin/models/SatelliteData/NeoWs';
import SatelliteData from '../../bin/models/SatelliteData/SatelliteData';
const CronJob = require('cron').CronJob;
const config = require('../../../_config/config.json');

export class SatelliteController {

    public static apod: APOD;
    public static neows: NeoWs;
    public static satelliteData: SatelliteData
    private static options = {
        uri: config.APOD.api_url,
        json: true
    };

    /**
     * @description Initialise the APOD:
     * - Starts a CronJob to repeat every 15 minutes, which updates A Picture Of the Day.
     */
    public static init(): void {
        if (config.weather.api_url) {
            console.log('\x1b[36m[*CRON] WeatherUpdate cron set to repeat every 15th minute.\x1b[0m');
            this.updateWeatherRepeater.start();

            if (!this.apod) {
                this.getLiveApod();
            }
        }
    }

    public static getLiveApod(): void {
        request.get(this.options, (error, result, body) => {
            if (!error && result.statusCode === 200) {
                SatelliteController.setCurrentApod(body);
            } else {
                console.error(`ERR: getLiveApod => error: ${error}`);
            }
        });
    }

    public static setCurrentApod(inputJson: any): APOD {
        if (inputJson[0]) {
            this.apod = this.mapApod(inputJson[0]);
            SatelliteController.onApodUpdate();
            return this.apod;
        } else {
            console.error('ERR: liveweer[0] missing');
            return;
        }
    }

    public static mapApod(inputJson: any): APOD {
        const picture = new APOD(inputJson.url);
        picture.date = inputJson.date;
        picture.explanation = inputJson.explanation;
        picture.title = inputJson.title;

        return picture;
    }

    /**
     * @description Sets a CronJob to update the weather automatically every 15 minutes.
     */
    private static updateWeatherRepeater = new CronJob('*/15 * * * *', function () {
        console.log(`[*CRON] trigger: \x1b[32mupdateWeatherRepeater\x1b[0m, ${new Date()}`);
        SatelliteController.getLiveApod();
    });

    /**
     * @description tell everyone the weather updated, sends the new prediction after it as well.
     */
    public static onApodUpdate(): void {
        Server.socketio().sockets.emit('apodUpdate', this.apod);
    }

}
