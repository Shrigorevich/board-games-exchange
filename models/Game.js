const {Schema, model, Types} = require('mongoose');
const mongoose = require('mongoose');

const schema1 = new Schema({
   name: {type: String, required: true},
   picture: {type: String, required: false},
   price: {type: Number, required: false},
   userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
   username: {type: String, required: true},
   date: {type: Date, default: Date.now}
})

const schema2 = new Schema({
   firstGame: {type: schema1, required: true},
   secondGame: {type: schema1, required: true},
   firstUser: {type: {}, required: true},
   secondUser: {type: {}, required: true},
   status: {type: Boolean, required: true},
   date: {type: Date, default: Date.now}
})

const Game = model('Game', schema1);
const Exchange = model('Exchange', schema2)

module.exports = {
   Game,
   Exchange   
}

