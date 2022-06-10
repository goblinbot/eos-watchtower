const _config = require('../configs/config.json');

class IcDate {
  constructor(inputDate) {
    this.ocEventStart = inputDate?.ocEventStart;
    this.icEventStart = inputDate?.icEventStart;
    // this.iStartDayOfweek = inputDate?.iStartDayOfweek
    this.iStartYear = inputDate?.iStartYear;
    this.iYear = inputDate?.iYear;
    this.iYearBefore = inputDate?.iYearBefore || _config.icDate.yearPrefix;
    this.iYearAfter = inputDate?.iYearAfter || _config.icDate.yearAffix;
    this.iDay = inputDate?.iDay;
    this.iMonth = inputDate?.iMonth;
    this.iDayOfWeek = inputDate?.iDayOfWeek;
    this.iDayName = inputDate?.iDayName;
    this.iMonthName = inputDate?.iMonthName;
  }
}

module.exports = {
  IcDate
}
