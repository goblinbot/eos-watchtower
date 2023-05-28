import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import { getDayOfWeekName, getLocalizedDayNumber } from "../../modules/time/time.helper";

dayjs.extend(UTC);

import CONFIG from "../../../_config/config.json"
const DEFAULT_DATES = CONFIG.icDate

/**
 * @description Total time object.
 */
export class IcDate {
    iYear: number
    iYearBefore?: string
    iYearAfter?: string
    iDay: number
    iMonth: number
    iDayOfWeek: number
    iDayName: string
    iMonthName: string

    constructor(inputDate) {
        // this.ocEventStart = inputDate?.ocEventStart;
        // this.icEventStart = inputDate?.icEventStart;
        // this.iStartYear = inputDate?.iStartYear;
        this.iYear = inputDate?.iYear || DEFAULT_DATES.yearDefault;
        this.iYearBefore = inputDate?.iYearBefore || DEFAULT_DATES.yearPrefix;
        this.iYearAfter = inputDate?.iYearAfter || DEFAULT_DATES.yearAffix;
        this.iDay = inputDate?.iDay;
        this.iMonth = inputDate?.iMonth;
        this.iDayOfWeek = inputDate?.iDayOfWeek || getLocalizedDayNumber();
        this.iDayName = inputDate?.iDayName || getDayOfWeekName();
        this.iMonthName = inputDate?.iMonthName;
    }
}

