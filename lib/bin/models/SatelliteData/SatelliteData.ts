import APOD from "./APOD";
import NeoWs from "./NeoWs";

export default class SatelliteData {
    lastUpdated: number; // epoch timestamps
    APOD: APOD; // picture of the day, can be used for scanning purposes
    NeoWs: NeoWs; //Near Eos Object Web Service
    constructor() {}
}
