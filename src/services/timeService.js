const dayjs = require('dayjs');
const UTC = require('dayjs/plugin/utc');
const {
  getLocalizedDayNumber,
  getDayOfWeekName,
} = require('../helpers/timeHelper');
const {IcDate} = require('../models/icDate');

dayjs.extend(UTC);

// TODO: dynamic dates
const eventDateData = {
  icEventStartDate: new Date(2022, 0, 1),
  ocEventStartDate: new Date(2022, 5, 24),
};

/**
 * @description Calculate and return the amount of hours between event start and -now-
 * @param {Date} ocEventStart
 * @return {Number} amount of time (Ms) passed, minimum of 0
 */
const getTimePassedSinceDate = (startDate) => {
  let diff = 0;

  if (startDate) {
    const now = dayjs().utc().hour(23);
    const start = dayjs(startDate).utc();

    console.log(now);
    console.log(start);

    diff = now.diff(start) > 0 ? now.diff(start) : 0;

    console.log(diff);
  }
  return diff;
};




//
//
//
//
//
//
// IS LOCALE { NL } EEN OPTIE?
//
//
//
//
//
//
//
//





/**
 *
 * @param {Date} date
 * @return {IcDate} converted 'input'
 */
const convertDateObjectToIcDate = (date) => {
  // TODO: trycatch
  if (!date) return false;

  const sourceDate = dayjs(date).utc();
  const iDayOfWeek = getLocalizedDayNumber();

  const input = {
    iDayOfWeek,
    iDayName: getDayOfWeekName(iDayOfWeek),
    iDay: sourceDate.date(),
    iMonth: sourceDate.month() + 1,
    iMonthName: sourceDate.format('MMMM').toLowerCase(),
  };

  return new IcDate(input);
};

const getCurrentIcDate = () => {
  const {ocEventStartDate, icEventStartDate} = eventDateData;
  const _timePassed = getTimePassedSinceDate(ocEventStartDate);
  let icDate = convertDateObjectToIcDate(icEventStartDate);

  if (_timePassed > 0) {
    const modifiedIcDate = dayjs(icEventStartDate)
      .utc()
      .add(_timePassed)
      .toDate();
    icDate = convertDateObjectToIcDate(modifiedIcDate);
  }

  return icDate;
};

console.log(getCurrentIcDate());

module.exports = {
  getTimePassedSinceDate,
  convertDateObjectToIcDate,
  getCurrentIcDate,
};
