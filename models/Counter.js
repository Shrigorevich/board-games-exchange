const {Schema, model} = require('mongoose');

const schema = new Schema({
    _id:{type: String, required: true},
    seq:{type: Number, required: true}

})

module.exports = model('Counter', schema)
