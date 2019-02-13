/**
 * @description Total time object.
 */
export class IcDate {
    ocEventStart: Date;
    icEventStart: Date;
    iStartDayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    iStartYear: number;

    iYear: number;
    iYearBefore: string; // title BEFORE the year. For example <Anno> 1776
    iYearAfter: string; // title AFTER the year. For example  1776 <A.D.>


    iDay: number;
    iMonth: number;
    iDayOfWeek: number;
    iDayName: string;
    iMonthName: string;
}
