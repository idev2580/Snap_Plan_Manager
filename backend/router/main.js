module.exports = function(app)
{
	//[Test]
	app.get('/',function(req,res){
		res.send("Hello World");
		//res.render('index.html');
	});

	//[Login]
	app.post('/login',function(req,res){
		var id = req.body.id
		var pw = req.body.pw
		//Check id, then check pw

		//Verified, then send 
		
	});

	//[Sign up]
	app.post('/signup',function(req,res){
		var id = req.body.id;
		var pw = req.body.pw;
		//Check if there is same id.
		
		
	});

	
	//[AppData Management]
	//!! All the data get request and post request needs ID to use data corresponding to id.
	app.get('/todos',function(req,res){
		//Requst for present TodoList,then remove all the TodoItems in toRemoveList.
		//When remove some items, before remove, copy it to RemovedItemList.
		
		//And, Send TodoList to Client.
		
	});
	
	app.get('/todos/history',function(req,res){
		//Get recent 5~10 Items from RemovedItemList.
		//Send to Client.
	});

	//[Add]
	app.post('/todos',function(req,res){
		//Add TodoItem.
		
	});

	//[Update]
	app.put('/todos',function(req,res){
		//First, Check the Type of Changing.
			//1. Click(Toggle)
			//2. Property Changing
				//2-1. Dependency Change
				//2-2. Priority Change
	});
}
