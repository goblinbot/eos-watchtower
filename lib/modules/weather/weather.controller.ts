import { WeatherData } from '../../bin/models/weather';
import * as Config from '../../../_config/config.json';
import * as request from "request";

export class WeatherController {

    public static currentWeather: WeatherData;

    public static convertToWeatherData(inputJson: any): WeatherData {
        const weather = new WeatherData();
            weather.lastupdated = new Date;
            weather.updatetimestamp = Date.now();
            weather.temperature = inputJson.temp;
            weather.windkmh = inputJson.windKmh;
            weather.winddirection = inputJson.windr;
            weather.sunup = inputJson.sup;
            weather.sununder = inputJson.sunder;
            weather.tempmintoday = inputJson.d0tmin;
            weather.tempmaxtoday = inputJson.d0tmax;
            weather.chanceofraintoday = inputJson.d0neerslag;
            weather.tempmintomorrow = inputJson.d1tmin;
            weather.tempmaxtomorrow = inputJson.d1tmax;
            weather.chanceofraintomorrow = inputJson.d1neerslag;
        return weather;
    }

    public static setCurrentWeather(inputJson: any): WeatherData {
        if(inputJson.liveweer[0]) {
            this.currentWeather = this.convertToWeatherData(inputJson.liveweer[0]);
            return this.currentWeather;
        } else {
            console.error('ERR: liveweer[0] missing');
            return;
        }
    }

}
