const {Schema, model, Types} = require('mongoose');
const mongoose = require('mongoose');

const schema = new Schema({
   firstName: {type: String, required: true, unique: true},
   lastName: {type: String, required: true},
   username: {type: String, required: true, unique: true},
   email: {type: String, required: true, unique: true},
   password: {type: String, required: true},
   avatar: {type: String, required: false},
   date: {type: Date, default: Date.now}
})

module.exports = model('User', schema)
