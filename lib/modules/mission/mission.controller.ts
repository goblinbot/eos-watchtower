import Mission from "../../bin/models/mission";
import { Server } from '../../bin/server';
import { MOCKMISSIONS } from '../../bin/data/mockmissions';

export class MissionController {

    // private static MissionListFull: any;

    public static init(): void {

        // TEST CODE: CREATE FULL MISSION DB FROM MOCKMISSIONS;

        MOCKMISSIONS.forEach(mockmission => {
            // this.createMissionInDB({
            //     priority: mockmission.priority,
            //     creationtimestamp: mockmission.creationtimestamp,
            //     type: mockmission.type,
            //     goal: mockmission.goal,
            //     title: mockmission.title,
            //     authorised: mockmission.authorised,
            //     authorisedby: mockmission.authorisedby,
            //     xo: mockmission.xo,
            //     icdate: mockmission.icdate,
            //     time: mockmission.time,
            //     delayed: false,
            //     editcounter: 0,
            // });
            console.log('  [Mission]:'+mockmission.title);
        });

    }

    public static createMissionInDB(missions): void {
        const newMission = new Mission(missions);
        newMission.save(() => {
            MissionController.emitOnMissionChanges();
        });

    }

    private static async emitOnMissionChanges(): Promise<void> {
        // if(Server.socketio()) {
        //     Server.socketio().sockets.emit('MissionUpdate', this.fobListFull);
        // }
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
