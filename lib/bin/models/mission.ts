export class Mission {
    id: number;
    priority: number;
    creationtimestamp: number; // epoch
    type: string;
    goal: string;
    title: string;
    authorised: boolean;
    authorisedby: string; // name
    debriefagent: string; // name
    xo: string; // name
    agentsjoined: number;
    agentsrequested: number;
    icdate: string; // STRING? Yup. In-game date.
    time: Date;
    additional: string; // extra comments.
}
