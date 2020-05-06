const {Schema, model, Types} = require('mongoose');
const mongoose = require('mongoose');

const schema = new Schema({
   name: {type: String, required: true},
   picture: {type: String, required: false},
   price: {type: Number, required: false},
   userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
   date: {type: Date, default: Date.now}
})

module.exports = model('Game', schema)
