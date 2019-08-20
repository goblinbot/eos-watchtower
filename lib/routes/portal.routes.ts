import { Router } from 'express';
import { PortalController } from '../modules/portal/portal.controller';
const portalData = require('../bin/data/portal.json');

// Routes for the Gateway/Portal API/Module
export class PortalRoutes {

    /** @returns {Router} */
    public static getRoutes(): Router {
        const router = Router();

        /**
         * @description get the current portal status. */
        router.route('/').get((req, res) => {
            res.status(200).send('portal test');
        });

        /**
         * @description get the full portal JSON */
        router.route('/all').get((req, res) => {
            res.status(200).send(portalData);
        });

        console.log('[RO] ..Portal Routes added.');
        return router;
    }
}
