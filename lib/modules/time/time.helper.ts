import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";

dayjs.extend(UTC);

export const DAY_NAMES = [
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
export const getLocalizedDayNumber = (day = dayjs.utc().day()) => day === 0 ? 7 : day;

/**
 * @param {Number} dayNumber (1 - 7)
 * @returns string (monday - sunday)
 */
export const getDayOfWeekName = (dayNumber?) => {
    const dayIndex = (dayNumber || getLocalizedDayNumber()) - 1;
    return DAY_NAMES[dayIndex];
};