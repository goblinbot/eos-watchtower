import Mission from "../../bin/models/mission";
import { Server } from '../../bin/server';
import { MOCKMISSIONS } from '../../bin/data/mockmissions';
import { SOCKET_MISSION_UPDATE } from "../../shared/constants.sockets";

export class MissionController {

    public static init(): void { }

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

    public async updateMission(mission: any): Promise<void> {
        // await Mission.updateOne( { _id: mission._id }, () => {
        //     MissionController.emitOnMissionChanges();
        // });

        const target = { _id: mission._id }
        const changes = { ...mission }
        delete changes._id

        await Mission.findOneAndUpdate(target, changes, { 
            returnOriginal: false,
            useFindAndModify: false
        }, () => {
            MissionController.emitOnMissionChanges();
        });
    }

    private static async emitOnMissionChanges(): Promise<void> {
        console.log('SocketUpdate: Mission Board updated');
        if(Server.socketio()) {
            Server.socketio().sockets.emit(SOCKET_MISSION_UPDATE);
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
