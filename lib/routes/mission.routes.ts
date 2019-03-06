import { AsyncRouter } from 'express-async-router';
import { MissionController } from '../modules/mission/mission.controller';

/** @returns {Router} */
export class MissionRoutes {
    public static getRoutes() {
        const router = AsyncRouter();
        const missionController: MissionController = new MissionController();

        router.route('/').get(missionController.getAllMissionsFromDB);

        router.route('/new').post((req, res) => {
            missionController.createMission(req.body);
        });

        router.route('/delete').post((req, res) => {
            missionController.deleteMission(req.body);
        });

        router.route('/update').post((req, res) => {
            missionController.updateMission(req.body);
        });

        console.log('[RO] ..Mission Routes added.');
        return router;
    }
}
