import { TransportModifications } from './transport-modifications';

export class Transport {
    id: number;
    type: 'Shuttle'; // string, i.e. TANK, SHUTTLE, QUADRAPOD. Right now only shuttles are planned.
    name: string;
    model: string;
    status: {
        text: string;
        code: number;
        mechanical: string;
    };
    customUpgrades: TransportModifications[];
}
