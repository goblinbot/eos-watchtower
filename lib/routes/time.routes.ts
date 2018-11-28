import { Router } from 'express';
import { TimeController } from '../modules/time/time.controller';

export class TimeRoutes {
    public static getRoutes(): Router {
        const router = Router();

        /* start the time controller. */
        TimeController.init();

        /**
         * @description get the current IC date / time. */
        router.route('/').get((req, res) => {
            res.status(200).send(TimeController.getCurrentDate());
        });

        console.log('[RO] ..DateTime Routes added.');
        return router;
    }
}
