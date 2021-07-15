
var mongoose = require("mongoose");
var Schema =mongoose.Schema;

var myuser=new Schema({
    name:String,
    address:String
});


var employee=new Schema({
    name:String,
    position:String,
    salary:String
});


const users=mongoose.model('user', myuser)
const user1=mongoose.model('employee',employee)
// module.exports=users

module.exports = {
    users, user1
}