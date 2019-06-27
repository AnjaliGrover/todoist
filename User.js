var mongoose = require('mongoose')

var User = mongoose.model('User', {
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  PhoneNo: {
    type: Number,
    required: true
  }
});
module.exports = User;