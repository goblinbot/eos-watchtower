const express = require('express');
const app = express();
const statusRoutes = express.Router();
const globalConfig = require('../_config/config.js');

const defaultStatus = {

    generic: {
        api: globalConfig.sys.name,
        status: 'Online',
        colorscheme: 'default',
        power: 100,
    },
    attack: {
        under_attack: false,
        forces: 'none',
        location: 'none',
    },
    broadcast: {
        priority: 1,
        duration: 0,
        title: 'Standby',
        status: 'default',
    },
    security: {
        level: 20,
        title: 'Code Green - All clear',
    }

};

statusRoutes.route('/generic/').get(function (req, res) {
    // OrderItems.find(function (err, OrderItems) {
    //     if (err) {
    //         res.send('No results');
    //     } else {
    //         res.json(OrderItems);
    //     }
    // });
    res.json(defaultStatus.generic);
});

statusRoutes.route('/broadcast/').get(function (req, res) {
    res.json(defaultStatus.broadcast);
});

statusRoutes.route('/security/').get(function (req, res) {
    res.json(defaultStatus.security);
});

statusRoutes.route('/*').get(function (req, res) {
    res.json(defaultStatus);
});




module.exports = statusRoutes;