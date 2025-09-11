const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema=new mongoose.Schema({
    username: {
    type: String,
    unique: false 
  },
    email:{ type:String },
    password:{ type:String },
    role:{
        type:String, 
        enum:["Alumini","Admin","Student"],
        default:"Student"
    },
   
})

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", userSchema);

module.exports = User;
