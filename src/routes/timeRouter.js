const express = require('express');
const router = express.Router();
const TimeService = require('../services/timeService');

router.get('/', (req, res) =>
  res.status(200).send('SUCCESFUL Test Time Response!')
);

router.get('/mock', (req, res) => {
  const _date = TimeService.getMockIcDate();
  res.status(200).send(_date)
});

module.exports = router;
