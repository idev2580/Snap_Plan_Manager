module.exports = function(app,username_todos_list,username_pw_list,Todo,User_PW,User_Todos,db)
{
	//[Login]
	app.post('/login',function(req,res){
		//console.log("LoginFunc Excuted.")
		try{
			var id = req.body.id
			var pw = req.body.pw

			//Check id, then check pw
			console.log("USERNAME_PW_LIST :",username_pw_list)
			if (username_pw_list.findIndex(acc => acc.username === id) === -1){
				//Not found
				//console.log("ID_NOT_FOUND")
				res.send({loginbool:false})
				console.log("Login Attempt/ ID:",id,"/PW:",pw,"/RESULT:","false","-ID_INCORRECT")
			}
			else{
				//Found
				if(username_pw_list.findIndex(acc => acc.pw === pw) === -1){
					res.send({loginbool:false})
					console.log("Login Attempt/ ID:",id,"/PW:",pw,"/RESULT:","false","-PW_INCORRECT")
				}
				else{
					res.send({loginbool:true})
					console.log("Login Attempt/ ID:",id,"/PW:",pw,"/RESULT:","true")
				}
			}
		}
		catch{}
	});

	//[Sign up]
	app.post('/signup',function(req,res){
		var id = req.body.id;
		var pw = req.body.pw;
		//Check if there is same id.
		if (username_pw_list.findIndex(acc => acc.username === id) === -1){
			//Add
			username_pw_list.push({
				username: id,
				pw: pw
			})
			username_todos_list.push({
				username: id,
				todos:[],
				id:0,
				recent_removed:[]
			})
			let newUP = new User_PW();
			newUP.username = id;
			newUP.pw = pw;
			newUP.save()

			let newUT = new User_Todos();
			newUT.username=id
			newUT.todos=[]
			newUT.id=0
			newUT.recent_removed=[]
			newUT.save()

			console.log("NEW ID ADDED. ID:",id)
		}
		else{
			//Not Add, send res "err"
			console.log("ADD FAILED. SAME ID EXISTS")
		}
	});

	
	//[AppData Management]
	//!! All the data get request and post request needs ID to use data corresponding to id.
	app.post('/todosget',function(req,res){
		//Get Todos
		const get_username = req.body.username
		console.log("GET Request of username :",get_username)
		const index = username_todos_list.findIndex(user=> user.username === get_username)
		//And, Send TodoList to Client.
		if(index>-1){
			res.send({todos:username_todos_list[index].todos, id:username_todos_list[index].id})
		}
	});
	
	app.post('/todoshistory',function(req,res){
		//Get recent 5~10 Items from RemovedItemList.
		//Send to Client.
		const get_username = req.body.username
		const index = username_todos_list.findIndex(user => user.username === get_username)
		console.log("HISTORY REQUESTED / ID:",get_username)
		if(index>-1){
			res.send(username_todos_list[index].recent_removed)
		}
	});

	//[Add]
	app.post('/todos',function(req,res){
		const get_username = req.body.username
		const username_index = username_todos_list.findIndex(user=> user.username === get_username)
		const add_type = req.body.type

		console.log("ADD/","ID:",get_username,"/TYPE:",add_type)
		if (add_type == 1){
			toadd = req.body.todo
			toadd.dep_id=0
			username_todos_list[username_index].id++
			username_todos_list[username_index].todos.push(toadd)

			//User_Todos.find((err,utodos) =>{console.log(utodos)})
			//findOne doesn't work. so, use below format for other DB-parts.
			User_Todos.find((err,utodos) =>{console.log(utodos.filter((utodo)=>utodo.username === get_username)[0])})
			User_Todos.find((err,utodos) =>{utodos.filter((utodo)=>utodo.username === get_username)[0].addtodo(toadd)})
			User_Todos.find((err,utodos) =>{utodos.filter((utodo)=>utodo.username === get_username)[0].id = username_todos_list[username_index].id})
			
		}
		else if (add_type == 2){
			const parent_id = req.body.parent_id
			const parent_index = username_todos_list[username_index].todos.findIndex(todo => todo.id === parent_id)

			toadd = req.body.todo
			username_todos_list[username_index].todos[parent_index].dep_id++
			username_todos_list[username_index].todos[parent_index].dependencies.push(toadd)

			User_Todos.find((err,utodos) =>{console.log(utodos.filter((utodo)=>utodo.username === get_username)[0])})
			User_Todos.find((err,utodos) =>{utodos.filter((utodo)=>utodo.username === get_username)[0].addtodo_dep(parent_id,toadd)})
			User_Todos.find((err,utodos) =>{let __id = utodos.filter((utodo)=>utodo.username === get_username)[0]._id
				console.log(__id)
				User_Todos.findById(__id,function(err,utodo){
					console.log(utodo.todos.filter((td)=>td.id === parent_id)[0])
					utodo.todos.filter((td)=>td.id === parent_id)[0].dep_id = username_todos_list[username_index].todos[parent_index].dep_id
					utodo.addtodo_dep(parent_id,toadd)
				})
			})
		}
	});

	//[Remove]
	app.post('/todosremove',function(req,res){
		//Type : 1 - Todo, 2 - Dependency
		
		const get_username = req.body.username
		const username_index = username_todos_list.findIndex(user=> user.username === get_username)
		const toggle_type = req.body.type
		console.log("REMOVE/","ID:",get_username,"/TYPE:",toggle_type)

		if (toggle_type == 1){
			const id = req.body.id
			const index = username_todos_list[username_index].todos.findIndex(todo => todo.id === id)
			const tormv = username_todos_list[username_index].todos[index]
			
			if (username_todos_list[username_index].recent_removed.length >=10){
				let temp_text = username_todos_list[username_index].recent_remove[0].text
				username_todos_list[username_index].recent_remove.splice(0,1) //username_todos_list[username_index].recent_removed = 
				User_Todos.find((err,utodos) =>{utodos.filter((utodo)=>utodo.username === get_username)[0].removerecent_removed(temp_text)})
				//User_Todos.findOne({username: get_username}).removerecent_removed(temp_text)

			}
			if (username_todos_list[username_index].recent_removed.findIndex((t)=>tormv.text === t.text && tormv.dependencies === t.dependencies) == -1){
				username_todos_list[username_index].recent_removed.push({text: tormv.text, dependencies: tormv.dependencies});
				User_Todos.find((err,utodos) =>{utodos.filter((utodo)=>utodo.username === get_username)[0].addrecent_removed({text: tormv.text, dependencies: tormv.dependencies})})
				//User_Todos.findOne({username: get_username}).addrecent_removed({text: tormv.text, dependencies: tormv.dependencies})
			}
			username_todos_list[username_index].todos.splice(index,1) //username_todos_list[username_index].todos = 
			User_Todos.find((err,utodos) =>{utodos.filter((utodo)=>utodo.username === get_username)[0].removetodo(id)})
			res.send(username_todos_list)
		}
		else if(toggle_type == 2){
			const parent_id = req.body.parent_id
			const id = req.body.id
			const parent_index = username_todos_list[username_index].todos.findIndex(todo => todo.id === parent_id)
			const index = username_todos_list[username_index].todos[parent_index].dependencies.findIndex(dep => dep.id === id)
			
			User_Todos.findOne({username: get_username}).removetodo_dep(parent_id,id)
			username_todos_list[username_index].todos[parent_index].dependencies = username_todos_list[username_index].todos[parent_index].dependencies.splice(index,1)
		}
	});
}
