const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Book")

const Schema = mongoose.Schema;
const UserSchema = new Schema({

    
    username:String,
    emailaddress:String,
    phonenumber:Number,
    password:String,
    
});

var userdata = mongoose.model('userdatas' , UserSchema)
module.exports =userdata