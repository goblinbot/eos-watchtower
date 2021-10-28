export default class NeoWs {
    private _elementCount: number;
    private _nearEosObjects: NearEosObjects;
    private _isPotentiallyHazardousAstoroid: boolean;
    private _closeApproachData: Array<Metrics>;

    constructor(
        elementCount: number,
        nearEosObjects: NearEosObjects,
        isPotentiallyHazardousAstoroid: boolean,
        closeApproachData: Array<Metrics>,
    ) {
        this._elementCount = elementCount;
        this._nearEosObjects = nearEosObjects;
        this._isPotentiallyHazardousAstoroid = isPotentiallyHazardousAstoroid;
        this._closeApproachData = closeApproachData;
    }

    public get elementCount(): number {
        return this._elementCount;
    }

    public get nearEosObjects(): NearEosObjects {
        return this._nearEosObjects;
    }

    public get isPotentiallyHazardousAstoroid(): boolean {
        return this._isPotentiallyHazardousAstoroid;
    }

    public get closeApproachData(): Array<Metrics> {
        return this._closeApproachData;
    }

    public set elementCount(value: number) {
        this._elementCount = value;
    }

    public set nearEosObjects(value: NearEosObjects) {
        this._nearEosObjects = value;
    }

    public set isPotentiallyHazardousAstoroid(value: boolean) {
        this._isPotentiallyHazardousAstoroid = value;
    }

    public set closeApproachData(value: Array<Metrics>) {
        this._closeApproachData = value;
    }
}

type NearEosObjects = {
    EosObject: Array<EosObject>;
};

type EosObject = {
    asteroid_id: string;
    name: string;
    absoluteMagnitudeH: number;
    estimatedDiameter: EstimatedDiameter;
};

type EstimatedDiameter = {
    kilometers: Size;
    meters: Size;
    miles: Size;
    feet: Size;
};

type Size = {
    estimatedDiameterMin: number;
    estimatedDiameterMax: number;
};

type Metrics = {
    epochDateCloseApproach: number;
    relativeVelocity: Speed;
    missDistance: MissDistance;
};

type Speed = {
    kilometersPerSecond: string;
    kilometerPerHour: string;
    milesPerHour: string;
};

type MissDistance = {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
};
