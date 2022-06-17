const timeRoutes = require('./timeRouter');

module.exports = (app) => {
  app.get('/', (req, res) =>
    res.status(200).send('.][.  Welcome to WatchTower 2.0')
  );

  app.use('/time', timeRoutes);
};
