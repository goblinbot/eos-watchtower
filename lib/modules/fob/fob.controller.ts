import Fob from '../../bin/models/fob';
import { Server } from '../../bin/server';
import { MOCKFOBS } from '../../bin/data/mockfobs';

export class FobController {

    public static init(): void {
        // TEST CODE: CREATE FULL FOB DB FROM MOCKFOBS;
    }

    public static createFobInDB(fob): void {
        const newFob = new Fob(fob);
        newFob.save();
    }

    private static async emitOnFobChanges(): Promise<void> {
        if (Server.socketio()) {
            Server.socketio().sockets.emit('fobUpdate');
        }
    }

    public getAllFobsFromDB = async (_req, res) => {
        Fob.find((_err: any, _fobs: any) => {
            // return fobs;
        }).then((fobs: any) => {
            res.json(fobs);
        }).catch((_err) => {
            res.status(400);
            res.json([]);
        });
    }

    public async updateFob(fob: any): Promise<void> {

        await Fob.updateOne({ _id: fob._id }, () => {
            FobController.emitOnFobChanges();
        });
    }

    public fillDbWithMockFobs(): void {
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
        FobController.emitOnFobChanges();
    }

}