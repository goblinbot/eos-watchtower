import * as SecData from '../../bin/data/security.json';
import { SecurityModel } from '../../bin/models/securitylevels';
import * as Config from '../../../_config/config.json';
import { Server } from '../../bin/server';

export class SecurityController {

    private static defaultSecLevel = Config.security.default;
    private static currentSecLevel = SecData[SecurityController.defaultSecLevel];

    /**
     * @returns the {secLevel} with a TIMESTAMP attached.
     * @param {secLevel}
     */
    private static addTimestamp(secLevel): JSON {
        let outputJSON = JSON.parse(JSON.stringify(secLevel));
        outputJSON.timestamp = Date.now();
        return JSON.parse(outputJSON);
    }

    /** @returns { Current seclevel } */
    public static getCurrent(): any {
        const secLevel = SecurityController.addTimestamp(SecurityController.currentSecLevel);
        return secLevel;
    }

    /** @description sets the security level based on input. */
    private static setSecurityLevel(input: any): void {
        this.currentSecLevel = input;
        this.onSecurityChange();
    }

    /** @returns { All secdata } */
    public static getAll(): any {
        return SecData;
    }

    /** @description Resets to default */
    public static resetSecurityLevel(): void {
        this.setSecurityLevel(SecData[SecurityController.defaultSecLevel]);
    }

    /**
     * @description SETS the security level to {INPUT} if possible.
     * @returns { TRUE | FALSE } for error checking.
     */
    public static updateSecurityLevel(input: string): boolean {
        if(input) {
            if (SecData[input]) {
                this.setSecurityLevel(SecData[input]);
                return true;
            }
        }
        return false;
    }

    /** @description Emit a websocket 'securityUpdate' for our dear listeners. */
    public static onSecurityChange(): void {
        Server.socketio().sockets.emit('securityUpdate', this.currentSecLevel);
    }

}
