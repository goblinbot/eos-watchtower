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
  'sunday',
];

/**
 * @param {Number} dayNumber (1 - 7)
 * @returns string (monday - sunday)
 */
const getDayOfWeekName = (dayNumber) => {
  const dayIndex = (dayNumber || dayjs.utc().day()) - 1;
  return DAY_NAMES[dayIndex];
};

module.exports = {
  getDayOfWeekName,
};
