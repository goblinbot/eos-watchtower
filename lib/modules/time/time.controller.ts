const dayjs = require('dayjs');
const UTC = require('dayjs/plugin/utc');
const {
    getLocalizedDayNumber,
    getDayOfWeekName,
} = require("./time.helper");
const { IcDate } = require("../../bin/models/time");
import { SOCKET_TIME_UPDATE } from "../../shared/constants.sockets";
import { Server } from "../../bin/server";

dayjs.extend(UTC);

// TODO: dynamic dates
export const eventDateData = {
    ocEventStartDate: new Date(2023, 5, 9, 12),
    icEventStartDate: new Date(2023, 6, 17, 12),
}

/**
 * @description Calculate and return the amount of hours between event start and -now-
 * @param {Date} ocEventStart
 * @return {Number} amount of time (Ms) passed, minimum of 0
 */
export const getTimePassedSinceDate = (startDate) => {
    let diff = 0;

    if (startDate) {
        const now = dayjs().utc().hour(23);
        const start = dayjs(startDate).utc();

        diff = now.diff(start) > 0 ? now.diff(start) : 0;
    }
    return diff;
};

/**
 *
 * @param {Date} date
 * @return {IcDate} converted 'input'
 */
export const convertDateObjectToIcDate = (date) => {
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

export const getCurrentIcDate = () => {
    const { ocEventStartDate, icEventStartDate } = eventDateData;
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
