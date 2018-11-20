export class WeatherData {
    lastupdated: number; // epoch timestamps
    temperature: number; // returned in celcius
    windkmh: number; // i.e. 35.5
    winddirection: string;
    sunup: string; // returns time in 24 hour format
    sundown: string; // returns time in 24 hour format
    // data for TODAY
    tempmin: number;
    tempmax: number;
    chanceofrain: number; // returns percentage 0-100 without the % symbol.
    // data for TOMORROW
    tempminnext: number;
    tempmaxnext: number;
    chanceofrainnext: number;

    constructor() {}
}
