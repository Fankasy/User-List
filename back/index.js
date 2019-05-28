var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");

const path = require("path");
const mongodbConnect = require("./config/database");
const db = mongoose.connection;
const User = require("./model/User");
var app = new express();
mongodbConnect();
var router = express.Router();
// Server Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("A " + req.method + " request received at " + new Date());
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});




app.get("/api/getall",(req,res)=> {
  console.log("test begin");
  User.find(function(err,users) {
    if (err) {
      console.log(err);
    }
    else{
      res.json({"data": users});
    }
  }); 
});

app.post("/api/createUser",(req,res) => {
  var user =new  User();
  console.log("********")
  console.log(req.body.user);
  let tmp = req.body.user;
  user.firstName = tmp.firstName;
  user.lastName = tmp.lastName;
  user.sex = tmp.sex;
  user.age = parseInt(tmp.age);
  user.password = tmp.password;
  user.save(function(err) {
    if (err) {
      console.log(err);
    }
    else{
      console.log("user saved");
      User.find(function(err,users){
          if(err){
            res.json({err,err});
            console.log(err);
          }
          else{
            res.json({users:users});
            console.log(users);
          }
      });
    }
  });
})

app.post("/api/editUser",(req,res)=> {
  console.log("********")
  console.log(req.body.user);
  let tmpUser = req.body.user;
  let id = tmpUser. id;
  User.findById(id,function(err,user) {
    if (err) {
      console.log(err);
    }
    else{
      console.log(user);
      user.firstName = tmpUser.firstName;
      user.lastName = tmpUser.lastName;
      user.age = tmpUser.age;
      user.sex = tmpUser.sex;
      user.save(function(err) {
        if (err) {
          console.log(err);
        }
        else{
          res.json({data:"updated"});
          console.log("updated");
          User.findById(id ,function(err,user) {
            if (err) {
              console.log(err);
            }else{
              console.log(user);
            }
          })
        }
      })
    }
  })
})
app.delete("/api/deleteUser/:id", (req,res)=> {
  let id = req.params.id;
  console.log(id);
  User.remove({_id: id},function(err,user) {
    if (err) {
      res.send(err);
    }
    else{
      res.json({message: "Deleted!"})
    }
    
  })
})

const port  = 5000;


app.listen(port, () => {
    console.log("Listening to port 5000.");
  });
  