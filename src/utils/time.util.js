const dayjs = require('dayjs');

const DAY_NAMES = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const getDayOfWeekName = (dayNumber) => {
  const dayIndex = (dayNumber || dayjs().day()) - 1;
  return DAY_NAMES[dayIndex];
};

module.exports = {
  getDayOfWeekName,
};
