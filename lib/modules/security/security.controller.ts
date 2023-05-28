const secData = require('../../bin/data/security.json');
// import { SecurityModel } from '../../bin/models/securitylevels';
const config = require('../../../_config/config.json');
import { SOCKET_SECLVL_UPDATE } from '../../shared/constants.sockets';
import { Server } from '../../bin/server';

export class SecurityController {

    private static defaultSecLevel = config.security.default;
    private static currentSecLevel = secData[SecurityController.defaultSecLevel];


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
        return secData; // all of it
    }

    public static updateSecurityLevel(input: string): boolean {
        if(input) {
            if (secData[input]) {
                this.setSecurityLevel(secData[input]);
                return true;
            }
        }
        return false;
    }

    public static resetSecurityLevel(): void {
        this.setSecurityLevel(secData[SecurityController.defaultSecLevel]);
    }

    private static setSecurityLevel(input: any): void {
        this.currentSecLevel = input;
        this.onSecurityChange();
    }

    private static onSecurityChange(): void {
        Server.socketio().sockets.emit(SOCKET_SECLVL_UPDATE, this.currentSecLevel);
    }

}
