import mongoose from 'mongoose';

export interface IFob extends mongoose.Document {
    _id: string;
    name: string;
    coordinates: string;
    forces: number;
    status: string;
    orderCode: number;
    foodSupplyPercentage: number;
    weaponSupplyPercentage: number;
    medicalSupplyPercentage: number;
    classes: string;
};

export const FobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coordinates: { type: String },
    forces: { type: Number },
    status: { type: String },
    orderCode: { type: Number },
    foodSupplyPercentage: { type: Number, min: 0, max: 100 },
    weaponSupplyPercentage: { type: Number, min: 0, max: 100 },
    medicalSupplyPercentage: { type: Number, min: 0, max: 100 },
    classes: { type: String }
});

const Fob = mongoose.model('Fob', FobSchema);
export default Fob;
