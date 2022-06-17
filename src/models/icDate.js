const dayjs = require('dayjs');
const UTC = require('dayjs/plugin/utc');
const {icDate: DEFAULT_DATES} = require('../configs/config.json');
const {getDayOfWeekName} = require('../utils/time.util');

dayjs.extend(UTC);

class IcDate {
  constructor(inputDate) {
    this.ocEventStart = inputDate?.ocEventStart;
    this.icEventStart = inputDate?.icEventStart;
    this.iStartYear = inputDate?.iStartYear;
    this.iYear = inputDate?.iYear;
    this.iYearBefore = inputDate?.iYearBefore || DEFAULT_DATES.yearPrefix;
    this.iYearAfter = inputDate?.iYearAfter || DEFAULT_DATES.yearAffix;
    this.iDay = inputDate?.iDay;
    this.iMonth = inputDate?.iMonth;
    this.iDayOfWeek = inputDate?.iDayOfWeek || dayjs.utc().day();
    this.iDayName = inputDate?.iDayName || getDayOfWeekName();
    this.iMonthName = inputDate?.iMonthName;
  }
}

module.exports = {
  IcDate,
};
