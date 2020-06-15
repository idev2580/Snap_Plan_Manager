var mongoose = require('mongoose');
var DepTodo = require('./DepTodo')
var Schema = mongoose.Schema

var todoSchema = new Schema({
    id: Number,
    text: String,
    dependencies: Array,
    dep_id: Number
},{_id:false});

todoSchema.methods.addtodo_dep = function(dep){
    let deptodo = new DepTodo();
    deptodo.text = dep.text
    deptodo.id = dep.id
    this.dependencies.push(deptodo)
}
todoSchema.methods.removetodo_dep = function(dep_id){
    this.dependencies.pull({id:dep_id})
}


module.exports = mongoose.model('todo',todoSchema)