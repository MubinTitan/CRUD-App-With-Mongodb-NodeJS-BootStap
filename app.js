//step1 create variables
const path=require('path');
var mongoose = require("mongoose");
const bodyParser = require('body-parser');
const express=require('express')
var UsersModel=require("./schema/user");
app=express()

//step2 create connection
var url = "mongodb://localhost:27017/mydb";
mongoose.connect(url,{  
	useNewUrlParser: true,
    useUnifiedTopology: true,
	useFindAndModify: false})

// step3 check connection


//step- 4 set view file
app.set('views',path.join(__dirname,'views'));

//step -5 - set view engines
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//step-6 create paths
app.get('/',async (req, res)=>{
	try{
		const data=await UsersModel.users.find();
		res.render('user_index',{users:data});
		// console.log(data)
		
  	}catch(err){
		res.send('error:'+ err);
  }
});

app.get('/emp',async (req, res)=>{
	try{
		const data=await UsersModel.user1.find();
		res.render('employee_index',{userss:data});
		
  	}catch(err){
		res.send('error:'+ err);
 	}
});

app.get('/add',(req, res) => {
	res.render('user_add', {
		title : 'CRUD Operation using NodeJS and MySQL'
	});
});


app.get('/addemp',(req, res) => {
	res.render('add_employee', {
	});
});

app.post('/saveemp',(req, res) => {
	console.log(req.body.address)
	var myobj = { name:req.body.name, position: req.body.position, salary:req.body.salary};
	UsersModel.user1.create(myobj)
	res.redirect('/emp');

});

app.post('/save',(req, res) => {
	console.log(req.body.address)
	var myobj = { name:req.body.name, position: req.body.position, salary:req.body.salary};
	UsersModel.users.create(req.body)
	res.redirect('/');
});


app.get('/edit/:userId',(req, res) => {
    const userId = req.params.userId;
    UsersModel.users.findById(userId, (err,user)=>{
		if(err) throw err;
		console.log(user)
		res.render('user_edit',{user:user})
	});
    
});
app.post('/update', (req, res)=>{
    const userid=req.body.id
	const name1=req.body.name
	const address1=req.body.address
	console.log(name1,address1);
	UsersModel.users.findByIdAndUpdate({"_id":userid}, {name:name1, address:address1}, function(err, result) { 
		res.redirect('/')
    });
});

app.get('/empedit/:userId',(req, res) => {
    const userId = req.params.userId;
    UsersModel.user1.findById(userId, (err,user)=>{
		if(err) throw err;
		console.log(user)
		res.render('employee_edit',{user:user})
	});
    
});
app.post('/empupdate', (req, res)=>{
	const userid=req.body.id
	const name1=req.body.name
	const position1=req.body.position
	const salary1=req.body.salary
	console.log(name1,position1);
	UsersModel.user1.findByIdAndUpdate({"_id":userid}, {name:name1, position:position1, salary:salary1}, function(err, result) { 
		res.redirect('/emp')
    });
});

app.get('/delete/:id',(req, res) => {
    const userId = req.params.id;
	console.log(userId)
	UsersModel.users.remove({"_id":userId}, function(err, result) { 
		res.redirect('/')
    });
	
});

app.get('/empdelete/:userId',(req, res) => {
    const userId = req.params.userId;
	console.log(userId)
	UsersModel.user1.findOneAndRemove({"_id":userId}, function(err, result) { 
		res.redirect('/emp')
    });
});


//step7 creating listning port
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
