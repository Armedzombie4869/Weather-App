const mongoose = require('mongoose');
const User = require('./UserModel');

mongoose.connect('mongodb://localhost:27017/passport-jwt');

const listSchema = mongoose.Schema({
    email:String,
    city:String
})

const ListModel = mongoose.model('List', listSchema);

module.exports = ListModel;