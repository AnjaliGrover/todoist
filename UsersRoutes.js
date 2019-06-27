var User = require('../models/User');
var mongoose = require('mongoose');

module.exports = function (app) {
    app.post('/user', function (req, res, next) {
        var user = new User({
            Name: req.body.name,
            Email: req.body.email,
            PhoneNo: req.body.phoneno
        });
        user.save().then(function (doc) {
            res.status(200).send(doc)
        }, function (error) {
            res.status(500).send(error)
        });
    });

    app.get('/user', function (req, res, next) {
        var db = mongoose.connection;
        User.find(function (err, docs) {
            console.log(docs);
            res.status(200).send(docs);
        }, function (err) {
            console.log(err);
        });

    });


    app.put('/user', function (req, res, next) {

        User.findByIdAndUpdate(req.query._id, req.body, {
                new: true
            },
            function (err, docs) {
                res.status(200).send(docs);
            },
            function (err) {
                console.log(err);
            });
    });
    app.delete('/user', function (req, res, next) {
        User.findByIdAndRemove(req.query._id, function (err, docs) {
                res.status(200).send(docs);
            },
            function (err) {
                console.log(err);
            });
    });


};