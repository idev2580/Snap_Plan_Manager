var mongoose = require('mongoose');
var Schema = mongoose.Schema

var deptodoSchema = new Schema({
    id: Number,
    text: String,
},{_id:false});

module.exports = mongoose.model('deptodo',deptodoSchema)