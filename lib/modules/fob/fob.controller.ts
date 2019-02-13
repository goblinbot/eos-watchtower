import Fob from '../../bin/models/fob';
import { Server } from '../../bin/server';
import { MOCKFOBS } from '../../bin/data/mockfobs';

export class FobController {

    // private static fobListFull: any;

    public static init(): void {

        // TEST CODE: CREATE FULL FOB DB FROM MOCKFOBS;
    }

    public static createFobInDB(fob): void {
        const newFob = new Fob(fob);
        newFob.save();
    }

    private static async emitOnFobChanges(): Promise<void> {
        // if(Server.socketio()) {
        //     Server.socketio().sockets.emit('fobUpdate', this.fobListFull);
        // }
    }

    getAllFobsFromDB = async (req, res) => {
        Fob.find((err: any, fobs: any) => {
            // return fobs;
        }).then((fobs: any) => {
            res.json(fobs);
        }).catch((err) => {
            res.status(400);
            res.json([]);
        });
    }

    public fillDbWithMockFobs() {
        MOCKFOBS.forEach(mockfob => {
            FobController.createFobInDB({
                name: mockfob.name,
                coordinates: mockfob.coordinates,
                forces: mockfob.forces,
                status: mockfob.status,
                orderCode: mockfob.orderCode,
                foodSupplyPercentage: mockfob.foodSupplyPercentage,
                weaponSupplyPercentage: mockfob.weaponSupplyPercentage,
                medicalSupplyPercentage: mockfob.medicalSupplyPercentage,
                classes: ''
            });
        });
    }

}
