var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var sessionController = require('./controllers/sessionController');

// The code below allows the node js to find the public directory with the index.html file
const publicPath = path.join(__dirname, './public');
// Node js is using port 3000/ and when you push to cloud it will use process.env.PORT
const port = process.env.PORT || 3000;

// Bodyparser for using json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));


app.use('/api/session', sessionController);

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
