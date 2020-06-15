var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userpwschema = new Schema({
    username:String,
    pw:String
})

module.exports = mongoose.model('userpw',userpwschema)