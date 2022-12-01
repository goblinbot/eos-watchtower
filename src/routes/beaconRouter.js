const express = require('express');
const router = express.Router();
const BeaconService = require('../services/beaconService');

router.get('/', (req, res) =>
  res.status(200).send(BeaconService.beaconState)
);

module.exports = router;
