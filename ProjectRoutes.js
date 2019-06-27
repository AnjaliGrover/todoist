var Project = require('../models/Project');
var Task = require('../models/Task');
var mongoose = require('mongoose');

module.exports = function (app) {
    app.post('/project', function (req, res, next) {
        var project = new Project({
            Title: req.body.Title,
            Description: req.body.Description
        });
        project.save().then(function (doc) {
            res.status(200).send(doc)
        }, function (error) {
            res.status(500).send(error)
        });


    });
    app.get('/projects', function (req, res, next) {
        Project.find(function (err, docs) {
            console.log(docs);
            res.status(200).send(docs);
        }, function (err) {
            console.log(err);
        });

    });

    app.get('/projecttasks', function (req, res, next) {
        Task.find({
            ProjectId: req.query.projectId
        }, function (err, docs) {
            console.log(docs);
            res.status(200).send(docs);
        }, function (err) {
            console.log(err);
        });

    });

    app.put('/project', function (req, res, next) {
        console.log(req.query._id);
        Project.findByIdAndUpdate(req.query._id, req.body, {
                new: true
            },
            function (err, docs) {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).send(docs);
            });
    });

    app.delete('/project', function (req, res, next) {
        console.log(req.query._id);
        Project.findByIdAndRemove(req.query._id, function (err, docs) {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(docs);
        });
    });
};