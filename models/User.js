const {Schema, model, Types} = require('mongoose');
const mongoose = require('mongoose');

const schema = new Schema({
   username: {type: String, required: true, unique: true},
   password: {type: String, required: true},
   date: {type: Date, default: Date.now}
})

module.exports = model('User', schema)
