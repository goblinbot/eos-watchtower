const fs = require('fs');

const _initialSetup = () => {
  if (fs.existsSync('configs/config.json')) {
    console.log('(i) config exists, procceeding');
  } else {
    fs.copyFile(
      'configs/config.sample.json',
      'configs/config.json',
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log(
          '(i) no config found => config.sample.json copied to config.json'
        );
      }
    );
  }
};

_initialSetup();
