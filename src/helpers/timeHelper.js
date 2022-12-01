const dayjs = require('dayjs');
const UTC = require('dayjs/plugin/utc');
dayjs.extend(UTC);

const DAY_NAMES = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

/**
 * @optional {Number} dayNumber, (0-6 from Date Objects)
 * @returns 1-7 daynumbers for Sunday-Last formatting
 */
const getLocalizedDayNumber = (day = dayjs.utc().day()) => day === 0 ? 7 : day;

/**
 * @param {Number} dayNumber (1 - 7)
 * @returns string (monday - sunday)
 */
const getDayOfWeekName = (dayNumber) => {
  const dayIndex = (dayNumber || getLocalizedDayNumber()) - 1;
  return DAY_NAMES[dayIndex];
};

module.exports = {
  getLocalizedDayNumber,
  getDayOfWeekName,
};
