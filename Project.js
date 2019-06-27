var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

var project = mongoose.model('Project', { //mongoose.model() on a schema, Mongoose compiles a model for you. //The first argument is the singular name of the collection your model is for.Ex-if it is projects,u can write project
    Title: {
        type: String,
        required: true
    },
    // Description: {
    //     type: String,
    //     required: true
    // }
});

module.exports = project;