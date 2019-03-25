import * as mongoose from 'mongoose';

export interface IMission extends mongoose.Document {
    _id: number;
    priority: number;
    creationtimestamp: number; // epoch
    type: string;
    goal: string;
    title: string;
    authorised: boolean;
    authorisedby?: string;
    colorcode: string;
    /*debriefagent?: string;*/
    xo: string;
    icdate: string; // string? Yup. In-game date.
    shuttle: string;
    departureTime: Date;
    delayed: boolean;
    editcounter: number;
};

export const MissionSchema = new mongoose.Schema({
    priority: { type: Number, required: true, min: 0, max: 20 },
    creationtimestamp: { type: Number, required: true },
    type: { type: String },
    goal: { type: String },
    title: { type: String },
    authorised: { type: Boolean },
    authorisedby: { type: String },
    colorcode: { type: String },
    xo: { type: String },
    icdate: { type: String },
    shuttle: { type: String },
    departureTime: { type: Date },
    delayed: { type: Boolean },
    editcounter: { type: Number },
});

const Mission = mongoose.model('Mission', MissionSchema);
export default Mission;
