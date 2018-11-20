import { Router } from 'express';
// import security.json as a mock database of security levels.
import { SecurityController } from '../modules/security/security.controller';

export class SecLevel {

    /** @returns {Router} */
    public static getRoutes(): Router {

        const router = Router();

        // get current
        router.route('/').get((req, res) => {
            res.status(200).send(SecurityController.getCurrent());
        });

        // get all
        router.route('/all').get((req, res) => {
            res.status(200).send(SecurityController.getAll());
        });

        // set to NAME
        router.route('/set/:input').get((req, res) => {
            if (SecurityController.updateSecurityLevel(req.params['input'])) {
                res.status(200).send({ message: 'Security level elevated'});
            } else {
                res.status(400).send({ message: 'input error'});
            }
        });

        // reset to DEFAULT
        router.route('/reset').get((req, res) => {
            SecurityController.resetSecurityLevel();
            res.status(200).send({ message: 'Security level reset' });
        });

        console.log('[RO] ..SecurityLevel Routes added.');
        return router;
    }
}
