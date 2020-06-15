const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
//const config = require('config');

app.use(cors());
app.use(bodyParser.json());


const db = mongoose.connection;
db.on('error',function(){
	throw new Error ('unable to connect to database at' + config.db)
});
db.once('open', function(){
	console.log('Connected to Database');
});

mongoose.connect('mongodb://localhost/snap_db');

var DepTodo = require('./models/DepTodo')
var Todo = require('./models/Todo')
var User_PW = require('./models/User_PW')
var User_Todos = require('./models/User_Todos')

var Todo_Ins = new Todo();
var User_Todos_Ins = new User_Todos();

//let username_pw_list = [{username:"jic4656",pw:"amolang"}]
let username_pw_list = []

let uspws = []
new Promise(function(resolve,reject){
	resolve(
		User_PW.find(function(err, user_pws){
			if(err){}
			else{
				uspws = user_pws.map((x)=>{
					let obj = {username:x.username,pw:x.pw}
					return obj
				})
			}})
	)
}).then(()=>{username_pw_list = [...uspws]; console.log(username_pw_list)})

let tempusrtds = []
let username_todos_list = []
new Promise(function(resolve,reject){
	resolve(
		User_Todos.find(function(err, user_todos){
			if(err){}
			else{
				tempusrtds = user_todos.map((x)=>{
					let obj = 	{username:x.username,
								todos:x.todos,
								id:x.id,
								recent_removed:x.recent_removed}
					return obj
				})
			}})
	)
}).then(()=>{username_todos_list = [...tempusrtds]; console.log(username_todos_list)}).finally(()=>{


//console.log(username_todos_list)
/*let username_todos_list=[{username:"jic4656",
			todos:[
				{
					id:0,
					text:"Physics",
					dependencies:[],
					dep_id:0
				},
				{
					id:1,
					text:"Calculus",
					dependencies:[
						{
							id:0,
							text:"Watch KLMS"
						}
					],
					dep_id:1
				},
				{
					id:2,
					text:"CS101_Lab",
					dependencies:[],
					dep_id:0
				},
				{
					id:3,
					text:"Chemistry",
					dependencies:[],
					dep_id:0
				}
			],
			id:4,
			recent_removed:[]
			}]*/

const router = require('./router/main.js')(app,username_todos_list,username_pw_list,Todo,User_PW,User_Todos, db);
const port = 4000;


app.listen(port,()=>console.log(`Example app listening at http://localhost:${port}`));
		})