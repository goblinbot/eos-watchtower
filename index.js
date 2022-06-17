const { App } = require('./src/app');

const { IcDate } = require('./src/models/icDate');
const test = new IcDate({ iYear: 240 });
console.log(test);


const { app } = new App();

// app.listen(5000, () => {
//   console.log('FIRST MOCK RESULT: server on');
// })
