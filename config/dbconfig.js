const mongoose =require('mongoose')
require('dotenv').config()

const uri=process.env.MONGODB_URI;

mongoose.connect(uri)
.then(()=>{
    console.log("mongodb connected");

})
.catch(()=>{
    console.log("fail to connect mongodb");
})

const credentials = {
    name: "admin",
    email: "admin@gmail.com",
    password: "123"
  }