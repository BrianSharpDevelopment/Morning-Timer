const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// routes
const user = require('./routes/user');
const routine = require('./routes/routine');
const utils = require('./routes/utils');

const app = express();

// Middelware
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// User
app.post("/user/register", user.register);
app.post("/user/login", user.login);

// Routine
app.post("/routine", utils.verifyToken, routine.createRoute);

module.exports = app;