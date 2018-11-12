import { Router } from 'express';

export class Beacon {

    /** @returns {Router} */
    public static getRoutes(): Router {
        const router = Router();
        router.route('/').get((req, res) => {
            res.status(200).send('Beacon API online');
        });
        return router;
    }
}
