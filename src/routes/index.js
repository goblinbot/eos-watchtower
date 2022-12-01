const timeRoutes = require('./timeRouter');
const beaconRoutes = require('./beaconRouter');

module.exports = (app) => {
  app.get('/', (req, res) =>
    res.status(200).send('.][.  Welcome to WatchTower 2.0')
  );

  app.use('/time', timeRoutes);
  app.use('/beacon', beaconRoutes);
};
