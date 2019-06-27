var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

var Task = mongoose.model('Task', {

    Title: {
        type: String,
        required: true,
    },
    // Description: {
    //     type: String,
    //     required: true,
    // },
    DueDate: {
        type: Date,
    },
    ProjectId: {
        type: ObjectId
    }
});

module.exports = Task;