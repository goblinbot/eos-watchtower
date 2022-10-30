import moment = require('moment');
import { IcDate } from '../../bin/models/time';
import { Server } from '../../bin/server';
const CronJob = require('cron').CronJob;

export class TimeController {

    public static ingameDate: IcDate;

    public static init(): void {
        if (!this.ingameDate) {
            this.ingameDate = this.convertToIcDateObject({
                ocEventStart: new Date(2022, 12, 2, 12), // at 12 o clock for timezone shenanigans.
                icEventStart: new Date(2022, 5, 26, 12), // It's important that the current IC year is also the OC year.
                icStartYear: 240,
                icStartDayOfWeek: 5,
                icYearAfter: 'NT'
            });
        }

        console.log('\x1b[36m[*CRON] TimeSocket cron set to trigger at Midnight.\x1b[0m');
        this.midnightUpdateCronJob.start();
    }

    private static midnightUpdateCronJob = new CronJob('0 0 * * *', function () {
        console.log(`[*CRON] trigger: \x1b[32m{midnightUpdateCronJob}\x1b[0m, ${new Date()}`);
        Server.socketio().sockets.emit('inGameDateUpdate');
    });

    private static convertToIcDateObject(input: any): IcDate {
        let convertedDate = new IcDate();
            convertedDate.ocEventStart = input.ocEventStart;
            convertedDate.icEventStart = input.icEventStart;
            convertedDate.iStartDayOfWeek = input.icStartDayOfWeek;
            convertedDate.iStartYear = input.icStartYear;
            convertedDate.iYearAfter = input.icYearAfter;
        return convertedDate;
    }

    public static getCurrentDate(): IcDate {
        if (this.ingameDate) {
            const ActualIcDate = this.calculateCurrentICDate();
            let convertedDate = this.ingameDate;
            convertedDate.iDay = moment(ActualIcDate).date();
            convertedDate.iMonth = (moment(ActualIcDate).month()) + 1;
            convertedDate.iYear = this.calculateActualYear({
                start: convertedDate.iStartYear,
                icStart: convertedDate.icEventStart,
                currentIcDate: ActualIcDate
            });
            convertedDate.iDayOfWeek = this.calculateNewDayOfWeek({
                startDayOfWeek: convertedDate.iStartDayOfWeek,
                ocStartDate: convertedDate.ocEventStart
            });
            convertedDate.iDayName = this.convertDayToDayName(convertedDate.iDayOfWeek); // Monday-Sunday
            convertedDate.iMonthName = moment().month(convertedDate.iMonth - 1).format('MMMM');

            this.ingameDate = convertedDate;
            return convertedDate;
        }
        return;
    }

    private static calculateCurrentICDate(): Date {
        const hoursPassed = this.calculateHoursSinceStart(this.ingameDate.ocEventStart);
        return moment(this.ingameDate.icEventStart).add(hoursPassed, 'hours').toDate();
    }

    private static calculateHoursSinceStart(ocEventStart: Date): number {
        const now = moment(new Date());
        const start = moment(ocEventStart);
        const diff = now.diff(start, 'hours');
        return (diff > 0 ? diff : 0);
    }

    //TODO this can be written cleaner.
    private static calculateActualYear(params:{ start: number, icStart: Date, currentIcDate: Date}): number {
        const icStartYear = moment(params.icStart).year();
        const currentYear = moment(params.currentIcDate).year();
        const difference = currentYear - icStartYear;
        return (difference > 0 ? params.start + difference : params.start);
    }

    private static calculateNewDayOfWeek(params: { startDayOfWeek: number, ocStartDate: Date }): number {
        const ocStartDay = moment(params.ocStartDate).date();
        const currentDay = moment().date();
        let difference = currentDay - ocStartDay;
        let dayOfWeek = (difference > 0 ? params.startDayOfWeek + difference : params.startDayOfWeek);
        while (dayOfWeek > 7) { // round to the nearest 1-7.
            dayOfWeek = (dayOfWeek - 7);
        }
        return dayOfWeek;
    }

    private static convertDayToDayName(dayOfWeek: number): string {
        switch (dayOfWeek) {
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
