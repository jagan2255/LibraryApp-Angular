const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")

const PORT = process.env.PORT || 3000

const bookdata = require("./src/Models/BooksModel")
const userdata = require("./src/Models/UserModel")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware Fuction to verify Token send from FrontEnd
function verifyToken(req,res,next){

    if(!req.headers.authorization){
       return res.status(401).send("Unauthorized Access")
    }
    var token = req.headers.authorization.split(' ')[1];
   
   console.log(token)
   if(token == "null"){
       return res.status(401).send("Unauthorized Access")
   }

   var payload= jwt.verify(token , "secretkey")
   console.log(payload)
   if(!payload){
       return res.status(401).send("Unauthorized Access")
   }
   req.userId = payload.subject
        next()
   }


app.get("/" , (req,res)=>{
    res.send(`Server Running on PORT ${PORT}`)
});


//Get Book
app.get("/books" ,verifyToken, (req,res)=>{

 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

  bookdata.find()
  .then((data)=>{
   res.send(data)
  });

});

//Post Book
app.post("/add" ,verifyToken, (req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

    console.log(req.body)

   var book ={

        code:req.body.data.code,
        bookname:req.body.data.bookname,
        author:req.body.data.author,
        rating:req.body.data.rating,
        edition:req.body.data.edition,
        description:req.body.data.description,
        imageurl:req.body.data.imageurl

    }
    
    var book = new bookdata(book);
    book.save();

});

//Delete Book
app.delete("/delete/:id" ,verifyToken, (req,res)=>{

    id = req.params.id;
    console.log(id)
bookdata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log(`Deleted ${id}`)
        res.send()
    })

});

//Get Book details for Update Form
app.get("/:id" , (req,res)=>{
    let id = req.params.id

    bookdata.findOne({"_id":id})
    .then((data)=>{
        res.send(data)
    })

})

//Update Book
app.put("/update" ,verifyToken, (req,res)=>{

    console.log(req.body)

    id=req.body._id,
    code=req.body.code,
    bookname=req.body.bookname,
    author=req.body.author,
    rating=req.body.rating,
    edition=req.body.edition,
    description=req.body.description,
    imageurl=req.body.imageurl
 
     console.log(id)

   bookdata.findByIdAndUpdate({"_id":id},
                                    {$set:{
                                    "code":code,
                                    "bookname":bookname,
                                    "author":author,
                                    "rating":rating,
                                    "edition":edition,
                                    "description":description,
                                    "imageurl":imageurl
                                    }})

    .then((data)=>{
        res.send(data)
    })

});



//Signup User

app.post("/adduser" , (req,res)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

    console.log(req.body)

   var user ={

        username:req.body.data.username,
        email:req.body.data.email,
        phonenumber:req.body.data.phonenumber,
        password:req.body.data.password

    }
    
    var user = new userdata(user);
    user.save();

});


//Login User
app.post("/login" , (req,res)=>{
   
    let logindata = req.body;
    console.log(logindata.data.username)
    uname= logindata.data.username;
    pword= logindata.data.password;
    if(uname==="admin" && pword==="1234"){
        let payload = {subject:uname+pword};
        let token = jwt.sign(payload , "secretkey")
        res.send({status: true , token})
    }else{

   userdata.findOne({"username":logindata.data.username , "password":logindata.data.password}).then((data)=>{
    console.log(data)
    if(data===null){
        res.send({ status: false, data: 'Invalid Username and Password' })
      
    }else if(data.username === uname && data.password === pword){
        let payload = {subject:uname+pword};
        let token = jwt.sign(payload , "secretkey")
        res.send({status: true , token})
       
    }else{
         res.send({ status: false, data: 'Invalid Username and Password' })

    }
  })
 }
})



app.listen( PORT , (req,res)=>{
    console.log(`Server Running on PORT ${PORT}`)
})