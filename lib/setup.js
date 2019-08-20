const fs = require('fs');

function installConfigFile() {
    if (fs.existsSync('../_config/config.json')) {
        console.log('(i) config exists, procceeding');
    } else {
        fs.copyFile('./_config/config.sample.json', './_config/config.json', (err) => {
            if (err) {
                console.log(err);
            }
            console.log('(i) no config found => config.sample.json copied to config.json');
        });
    }
}

installConfigFile();
