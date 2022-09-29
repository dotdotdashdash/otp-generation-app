const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var contactSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: true,
    unique: true
  },
  phone: {
    type: String,
    index: true,
    unique: true
  },
  communicationInfo: {
    otpMessages: [{
      messageBody: String,
      sentTime: Date,
      otp: Number
    }]
  }
});

var contactModel = mongoose.model('contact', contactSchema); //Model a collection with name users and schema as userSchema
module.exports = contactModel;