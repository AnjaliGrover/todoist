var Task = require('../models/Task');
var mongoose = require('mongoose');

module.exports = function (app) {
    app.post('/task', function (req, res, next) {
        var task = new Task({
            Title: req.body.Title,
            Description: req.body.Description,
            DueDate: req.body.DueDate,
            ProjectId: req.body.ProjectId
        });
        task.save().then(function (doc) {
            res.status(200).send(doc)
        }, function (error) {
            res.status(500).send(error)
        });
    });

    app.get('/tasks', function (req, res, next) {
        Task.find(function (err, docs) {
            console.log(docs);
            res.status(200).send(docs);
        }, function (err) {
            console.log(err);
        });

    });

    app.put('/tasks', function (req, res, next) {
        Task.findByIdAndUpdate(req.query._id, req.body, {
                new: true
            },
            function (err, docs) {
                res.status(200).send(docs);
            },
            function (err) {
                console.log(err);
            });
    });

    app.delete('/tasks', function (req, res, next) {
        console.log(req.query._id);
        Task.findByIdAndRemove(req.query._id, function (err, docs) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(docs);
        });
    });

};