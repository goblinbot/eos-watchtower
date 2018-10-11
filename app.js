// Het is kwart voor Express, pak express en de service(s).
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const storeService = require('/server/services/storeService'); // niet meer gebruiken voor nu.

// Het is Express-'o-clock.
const app = express();

// express configuratie
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// default bericht bij aanroepen API
app.get('/', function (req, res) {
    res.send('Welcome to the petSupplies API');
});

// Zet server aan bij 'node app','node app.js', 'nodemon app'..
const port = process.env.PORT || 8080;
const server = app.listen(port, function () {
    console.log(`Listen OK: port ${port}`);
});
