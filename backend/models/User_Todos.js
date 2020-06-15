var mongoose = require('mongoose');
var Todo = require('./Todo')

var Schema = mongoose.Schema

var usertodoschema = new Schema({
    username: String,
    todos:Array,
    id:Number,
    recent_removed:Array
})

usertodoschema.methods.addtodo = function(todo){
    let td = new Todo();
    td.id = todo.id
    td.text = todo.text
    td.dependencies = todo.dependencies
    td.dep_id = todo.dep_id
    this.todos.push(td)
    return this.save();
}
usertodoschema.methods.addtodo_dep = function(parent_id,dep){
    const index = this.todos.findIndex(todo => todo.id === parent_id)
    new Promise(function(resolve,reject){
        resolve(()=>{
        let deptodo = new DepTodo();
        deptodo.text = dep.text
        deptodo.id = dep.id
        this.todos[index].dependencies.push({text:dep.text, id:dep.id})
    })
    }).then(()=>{return this.save()})
}
    
usertodoschema.methods.addrecent_removed=function(todo){
    this.recent_removed.push({text:todo.text , dependencies:todo.dependencies })//, dep_id:todo.dep_id 
    return this.save();
}
usertodoschema.methods.removetodo = function(todo_id){
    this.todos.pull({id: todo_id});
    return this.save();
}
usertodoschema.methods.removetodo_dep = function(parent_id, dep_id){
    const index = this.todos.findIndex(todo => todo.id === parent_id)
    const obj = this.todos[index]
    obj.removetodo_dep(dep_id)
    return this.save();
}
usertodoschema.methods.removerecent_removed=function(textcon){
    this.recent_removed.pull({text:textcon})
    return this.save();
}

module.exports = mongoose.model('usertodo',usertodoschema)