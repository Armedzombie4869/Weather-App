const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/passport-jwt');

const otpSchema = mongoose.Schema({
    email:String,
    code:String,
    expiresIn: Number

},{
    timestamps:true
})

const otpModel = mongoose.model('otp', otpSchema,'OTP');

module.exports = otpModel;