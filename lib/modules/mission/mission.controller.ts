import Mission from "../../bin/models/mission";
import { Server } from '../../bin/server';
import { MOCKMISSIONS } from '../../bin/data/mockmissions';

export class MissionController {

    // private static MissionListFull: any;

    public static init(): void {

    }

    public createMission(mission: any): void {
        MissionController.createMissionInDB(mission);
    }

    private static createMissionInDB(missions): void {
        const newMission = new Mission(missions);
        newMission.save(() => {
            MissionController.emitOnMissionChanges();
        });
    }

    public deleteMission(mission: any): void {
        Mission.deleteOne(mission, () => {
            MissionController.emitOnMissionChanges();
        });
    }

    public updateMission(mission: any): void {
        Mission.updateOne(mission, err => {
            MissionController.emitOnMissionChanges();
        });
    }

    private static async emitOnMissionChanges(): Promise<void> {
        if(Server.socketio()) {
            Server.socketio().sockets.emit('MissionUpdate');
        }
    }

    getAllMissionsFromDB = async (req, res) => {
        Mission.find((err: any, missions: any) => {
            // return missions;
        }).then((missions: any) => {
            res.json(missions);
        }).catch((err) => {
            res.status(400);
            res.json([]);
        });
    }
}
