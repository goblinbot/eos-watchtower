import { Router } from 'express';
import { getCurrentIcDate, eventDateData } from "../modules/time/time.controller";
export class TimeRoutes {
    public static getRoutes(): Router {
        const router = Router();

        /**
         * @description get the current IC date / time. */
        router.route('/').get((req, res) => {
            res.status(200).send(getCurrentIcDate());
        });

        console.log('[RO] ..DateTime Routes added.');
        return router;
    }
}
