import { Router } from 'express';

export class BeaconRouter {

    constructor() {}

    /** @returns {Router} */
    public static getRoutes(): Router {

        const router = Router();

        router.route('/').get((req, res) => {
            res.status(200).send('Beacon API online');
        });

        router.route('/increasekey').get((req, res) => {
            res.status(200).send('Key + + +');
        });

        console.log('[RO] ..Beacon Routes added.');
        return router;
    }
}
