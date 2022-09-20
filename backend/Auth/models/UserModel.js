const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/passport-jwt');

const userSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    city:String,
    country:String,
    email:String,
    password:String
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;