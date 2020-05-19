const {Schema, model, Types} = require('mongoose');
const mongoose = require('mongoose');

const schema = new Schema({
   text: {type: String, required: true},
   from: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   to: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   rate: {type: Number, required: false},
   date: {type: Date, default: Date.now}
})

module.exports = model('Comment', schema)
