const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Book")

const Schema = mongoose.Schema;
const BookSchema = new Schema({

    code:Number,
    bookname:String,
    author:String,
    edition:String,
    rating:Number,
    imageurl:String,
    description:String,

});

var bookdata = mongoose.model('bookdatas' , BookSchema)
module.exports =bookdata