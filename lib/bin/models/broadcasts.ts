export class Broadcast {
    title: string;
    uniqueTitle: string; // replacement of the old "filename"
    priority: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 99;
    duration: number; // keep in mind: Milliseconds!
    colorScheme: string;
    location: string;
    extraParams: BroadcastParams[];
}

export class BroadcastParams {
    param: string;
    code: number;
    value: string;
}
