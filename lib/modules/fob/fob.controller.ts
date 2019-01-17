import Fob from '../../bin/models/fob';
import { Server } from '../../bin/server';

export class FobController {

    // private static fobListFull: any;

    public static init(): void {
        // this.createFobInDB({
        //     name: 'Oni',
        //     coordinates: 'G7',
        //     forces: 211,
        //     status: 'Under siege',
        //     supplyPercentage: 70,
        // });
        // this.createFobInDB({
        //     name: 'Thorax',
        //     coordinates: 'B6',
        //     forces: 0,
        //     status: 'OK',
        //     supplyPercentage: 0,
        // });
        // this.createFobInDB({
        //     name: 'Hurricane',
        //     coordinates: 'b5',
        //     forces: 64,
        //     status: 'OK',
        //     supplyPercentage: 10,
        // });
    }

    public static createFobInDB(fob: { name: string, coordinates: string, forces: number, status: string, supplyPercentage: number }): void {
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

}
