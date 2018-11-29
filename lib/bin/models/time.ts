/**
 * @description Total time object.
 */
export class IcDate {
    ocEventStart: Date;

    iStartDay: number; // day of the month in numbers
    iStartDayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    iStartMonth: number; // month of the year in numbers
    iStartYear: number;

    iDay: number;
    iMonth: number;

    iYear: number;
    iYearBefore: string; // title BEFORE the year. For example <Anno> 1776
    iYearAfter: string; // title AFTER the year. For example  1776 <A.D.>

    iDayOfWeek: number;
    iDayName: string;
    iMonthName: string;
}
