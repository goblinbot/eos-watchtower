import { AsyncRouter } from 'express-async-router';
import { FobController } from '../modules/fob/fob.controller';

export class FobRoutes {
    public static getRoutes() {
        const router = AsyncRouter();
        const fobController: FobController = new FobController();

        router.route('/').get(fobController.getAllFobsFromDB);

        console.log('[RO] ..FoB Routes added.');
        return router;
    }
}
