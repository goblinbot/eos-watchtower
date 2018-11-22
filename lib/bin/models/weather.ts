export class WeatherData {
    lastUpdated: number; // epoch timestamps
    temperature: number; // returned in celcius
    windkmh: number; // i.e. 35.5
    windDirection: string;
    sunUp: string; // returns time in 24 hour format
    sunDown: string; // returns time in 24 hour format
    // data for TODAY
    tempMin: number;
    tempMax: number;
    chanceOfRain: number; // returns percentage 0-100 without the % symbol.
    // data for TOMORROW
    tempMinNext: number;
    tempMaxNext: number;
    chanceOfRainNext: number;

    constructor() {}
}
