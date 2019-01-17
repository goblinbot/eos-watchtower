import * as mongoose from 'mongoose';

export interface IFob extends mongoose.Document {
    name: string;
    coordinates: string;
    forces: number;
    status: string;
    supplyPercentage: number;
};

export const FobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coordinates: { type: String },
    forces: { type: Number },
    status: { type: String },
    supplyPercentage: { type: Number, min: 0, max: 100 },
});

const Fob = mongoose.model('Fob', FobSchema);
export default Fob;
