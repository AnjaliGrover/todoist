var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var ejs = require('ejs');

var envObj = require('dotenv').config({
    path: __dirname + '/.env'
});


var app = express()
const port = process.env.PORT;

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.set('view engine', 'ejs');
app.use(cors());
var taskRoutes = require('./routes/TaskRoutes')(app);
var projectRoutes = require('./routes/ProjectRoutes')(app);
var userRoutes = require('./routes/UsersRoutes')(app);

mongoose.Promise = global.Promise;

var task = require('./models/Task');
var user = require('./models/User');
var project = require('./models/Project');

mongoose.connect(process.env.DATABASE)
    .then(function () {
        console.log("Mongodb connected successfully");
        app.listen(port, function (req, res, err) {
            if (err) {
                console.log('App  error.');
                console.log(err);
            } else {
                console.log('Listening at PORT ' + port);
            }
        })
    }, function (err) {
        console.log("Error in Mongodb connection");
        console.log(err);
    });

app.get('/todoapp', function (req, res, next) {
    res.render('index')
})



module.exports = app;