import { AsyncRouter } from 'express-async-router';
import { FobController } from '../modules/fob/fob.controller';

export class FobRoutes {
    public static getRoutes() {
        const router = AsyncRouter();
        const fobController: FobController = new FobController();

        router.route('/').get(fobController.getAllFobsFromDB);

        // enter MOCKFOBS
        router.route('/addmockfobs').get((req, res) => {
            fobController.fillDbWithMockFobs();
            res.status(200).send({ message: 'MockFobs == go' });
        });

        router.route('/update').post((req, res) => {
            fobController.updateFob(req.body);
            res.status(200).send({ message: 'Fob editted' });
        });

        console.log('[RO] ..FoB Routes added.');
        return router;
    }
}
