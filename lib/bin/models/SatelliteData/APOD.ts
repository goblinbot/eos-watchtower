export default class APOD {
    private _date: string //1995-06-16
    private _explanation: string // "Today's Picture:    Explanation:  If the Earth could somehow be transformed to the ultra-high density of a neutron star , it might appear as it does in the above computer generated figure. Due to the very strong gravitational field, the neutron star distorts light from the background sky greatly. If you look closely, two images of the constellation Orion are visible. The gravity of this particular neutron star is so great that no part of the neutron star is blocked from view - light is pulled around by gravity even from the back of the neutron star.   We keep an  archive file.  Astronomy Picture of the Day is brought to you by  Robert Nemiroff and  Jerry Bonnell . Original material on this page is copyrighted to Robert Nemiroff and Jerry Bonnell.",
    private _title: string // "Neutron Star Earth",
    private _url: string

    constructor(url: string) {
        this._url = url;
    }

    public get date(): string {
        return this._date;
    }
    public get explanation(): string {
        return this._explanation;
    }
    public get title(): string {
        return this._title;
    }
    public get url(): string {
        return this._url;
    }

    public set date(value: string) {
        this._date = value;
    }

    public set explanation(value: string) {
        this._explanation = value;
    }

    public set title(value: string) {
        this._title = value;
    }

    public set url(value: string) {
        this._url = value;
    }

}
