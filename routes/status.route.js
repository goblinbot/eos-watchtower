const express = require('express');
const app = express();
const statusRoutes = express.Router();


const defaultStatus = {
    status: 'default',
    seclevel: 20,
    power: 100,
};


statusRoutes.route('/test/').get(function (req, res) {
    // OrderItems.find(function (err, OrderItems) {
    //     if (err) {
    //         res.send('No results');
    //     } else {
    //         res.json(OrderItems);
    //     }
    // });
    let testStatus = defaultStatus;

    res.json(testStatus);
});

statusRoutes.route('/*').get(function (req, res) {
    res.send('watchTower:status API');
});




module.exports = statusRoutes;