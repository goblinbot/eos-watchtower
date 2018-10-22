// dependancy
const ip = require('ip');

// configuration file for eos-watchtower.
// This file can be modified to, for example, start watchtower on a different port, change the name, etc.

systemSettings = {
    port: 5000,
    name: 'watchTower',
    localaddress: ip.address(),
}








// export the config variables under a shorter name.
exports.sys = systemSettings;