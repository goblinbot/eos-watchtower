const dayjs = require('dayjs');
const UTC = require('dayjs/plugin/utc');
const _config = require('../configs/config.json');

dayjs.extend(UTC);
