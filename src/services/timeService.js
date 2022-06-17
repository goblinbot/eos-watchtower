const dayjs = require('dayjs');
const UTC = require('dayjs/plugin/utc');
const {IcDate} = require('../models/icDate');

dayjs.extend(UTC);


/**
 * @description Calculate and return the amount of hours between event start and -now-
 * @param {Date} ocEventStart 
 * @return {Number} amount of time (Ms) passed, minimum of 0
 */
const getTimePassedSinceDate = (startDate) => {
  let diff = 0;
  if (startDate && startDate === typeof Date) {
    const now = dayjs().utc();
    const start = dayjs(startDate).utc();
    diff = now.diff(start) > 0 ? now.diff(start) : 0;
  }
  return diff;
}

const getMockIcDate = () => new IcDate();

module.exports = {
  getTimePassedSinceStart,
  getMockIcDate
};
