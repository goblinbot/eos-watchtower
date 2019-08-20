import SecData from '../../bin/data/security.json';
// import { SecurityModel } from '../../bin/models/securitylevels';
import Config from '../../../_config/config.json';
import { Server } from '../../bin/server';

export class SecurityController {

    private static defaultSecLevel = Config.security.default;
    private static currentSecLevel = SecData[SecurityController.defaultSecLevel];


    private static addTimestamp(secLevel): JSON {
        let outputJSON = JSON.parse(JSON.stringify(secLevel));
        outputJSON.timestamp = Date.now();
        return JSON.parse(outputJSON);
    }

    public static getCurrent(): any {
        const secLevel = SecurityController.addTimestamp(SecurityController.currentSecLevel);
        return secLevel;
    }

    public static getAll(): any {
        return SecData; // all of it
    }

    public static updateSecurityLevel(input: string): boolean {
        if(input) {
            if (SecData[input]) {
                this.setSecurityLevel(SecData[input]);
                return true;
            }
        }
        return false;
    }

    public static resetSecurityLevel(): void {
        this.setSecurityLevel(SecData[SecurityController.defaultSecLevel]);
    }

    private static setSecurityLevel(input: any): void {
        this.currentSecLevel = input;
        this.onSecurityChange();
    }

    private static onSecurityChange(): void {
        Server.socketio().sockets.emit('securityUpdate', this.currentSecLevel);
    }

}
