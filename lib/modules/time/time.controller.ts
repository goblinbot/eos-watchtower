import * as moment from 'moment';
import { IcDate } from '../../bin/models/time';

export class TimeController {

    public static ingameDate: IcDate;

    /**
     * Start the time controller with a DEFAULT ingame date of 27-03-240NT
     */
    public static init(): void {
        /**
         * @description Set the default IC DATE to 27 march 240 NT.
         * @returns {IcDate}
         */
        if (!this.ingameDate) {
            this.ingameDate = this.convertToIcDate({
                ocEventStart: new Date(2018, 10, 30, 12), // 30 november 2018 / 30-11-2018, at 12 o clock for timezone shenanigans.
                icStartDay: 27,
                icStartMonth: 3,
                icStartYear: 240,
                icStartDayOfWeek: 5,
                icYearAfter: 'NT'
            });
        }
    }

    /**
     * Convert Input to IcDate object before it can be returned.
     * @returns {IcDate}
     */
    private static convertToIcDate(input: any): IcDate {
        let convertedDate = new IcDate();
            convertedDate.ocEventStart = input.ocEventStart;
            convertedDate.iStartDayOfWeek = input.icStartDayOfWeek;
            convertedDate.iStartDay = input.icStartDay;
            convertedDate.iStartMonth = input.icStartMonth;
            convertedDate.iStartYear = input.icStartYear;
        return convertedDate;
    }

    /**
     * @description calculate the ACTUAL current IC day based on IC and OC start dates.
     * @returns {Number}
     */
    private static calculateActualDay(start: number, ocEventStart: Date): number {
        const ocStartDay = moment(ocEventStart).date();
        const currentDay = moment().date();
        const difference = currentDay - ocStartDay;
        return (difference > 0 ? start + difference : start);
    }

    /**
     * @description calculate the ACTUAL current IC month based on IC and OC start dates.
     * @returns {Number}
     */
    private static calculateActualMonth(start: number, ocEventStart: Date): number {
        const ocStartMonth = moment(ocEventStart).month();
        const currentMonth = moment().month();
        const difference = ocStartMonth - currentMonth;
        return (difference > 0 ? start + difference : start);
    }

    /**
     * @description calculate the ACTUAL current IC month based on IC and OC start dates.
     * @returns {Number}
     */
    private static calculateActualYear(start: number, ocEventStart: Date): number {
        const ocStartYear = moment(ocEventStart).year();
        const currentYear = moment().year();
        const difference = ocStartYear - currentYear;
        return (difference > 0 ? start + difference : start);
    }

    /**
     * @description calculate the day of the week, 1 - 7.
     */
    private static calculateDayOfWeek(start: number, ocEventStart: Date): number {
        const ocStartDay = moment(ocEventStart).date();
        const currentDay = moment().date();
        let difference = currentDay - ocStartDay;
        let dayOfWeek = (difference > 0 ? start + difference : start);
        // Loop to make the difference round to the nearest 1-7.
        while (dayOfWeek > 7) {
            dayOfWeek = (dayOfWeek - 7);
        }
        return dayOfWeek;
    }

    /**
     * @description grabs the current IC date based on the IC and OC start date data.
     */
    public static getCurrentDate(): IcDate {
        if(this.ingameDate) {
            let convertedDate = this.ingameDate;
            convertedDate.iDay = this.calculateActualDay(convertedDate.iStartDay, convertedDate.ocEventStart);
            convertedDate.iMonth = this.calculateActualMonth(convertedDate.iStartMonth, convertedDate.ocEventStart);
            convertedDate.iYear = this.calculateActualYear(convertedDate.iStartYear, convertedDate.ocEventStart);
            convertedDate.iDayOfWeek = this.calculateDayOfWeek(convertedDate.iStartDayOfWeek, convertedDate.ocEventStart);
            convertedDate.iDayName = this.dayOfweekToNameOfDay(convertedDate.iDayOfWeek); // Monday-Sunday
            convertedDate.iMonthName = moment().month(convertedDate.iMonth - 1).format('MMMM'); // prints the IC Month in string form.

            this.ingameDate = convertedDate;
            return convertedDate;
        }
        return;
    }

    /**
     * @description Ugly but functional: moment.js doesn't seem to be able to convert Day of the week into a pure day name.
     * @returns {String}
     */
    private static dayOfweekToNameOfDay(input: number): string {
        switch(input) {
            case 1: return 'monday'; break;
            case 2: return 'tuesday'; break;
            case 3: return 'wednesday'; break;
            case 4: return 'thursday'; break;
            case 5: default: return 'friday'; break;
            case 6: return 'saturday'; break;
            case 7: return 'sunday'; break;
        }
    }

}
