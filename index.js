var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var sessionController = require('./controllers/sessionController');
var playerController = require('./controllers/playerController');

const port = process.env.PORT || 3000;

// Bodyparser for using json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/session', sessionController);
app.use('/api/player', playerController);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({code:1});
});

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
