const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/users");

const User = require("./model/User");

var user = new User();
user.firstName = "James";
user.lastName = "Harden";
user.age = 28;
user.sex = "Male";
user.password = "123456";

user.save(function(err){
    if (err) {
        console.log(err);
    }
    else{
        console.log("user created");
        User.find(function(err, users) {
			if (err) {
				console.log(err);
			}
			else {
				console.log(users);
			}
		});
    }
});