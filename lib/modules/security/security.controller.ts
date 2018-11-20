import * as SecData from '../../bin/data/security.json';
import { securityModel } from '../../bin/models/securitylevels';
import * as Config from '../../../_config/config.json';
// TODO import config for default

export class SecurityController {

    // default
    private static defaultSecLevel = 'green';
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

    /** @returns { All secdata } */
    public static getAll(): any {
        return SecData;
    }

    /** @description Resets to default */
    public static resetSecurityLevel(): void {
        SecurityController.currentSecLevel = SecData[SecurityController.defaultSecLevel];
    }

    /**
     * @description SETS the security level to {INPUT} if possible.
     * @returns { TRUE | FALSE } for error checking.
     */
    public static updateSecurityLevel(input: string): boolean {
        if(input) {
            if (SecData[input]) {
                SecurityController.currentSecLevel = SecData[input];
                return true;
            }
        }
        return false;
    }

    // private static onSecurityChange() {
        // websocket emit!
    // }

}
