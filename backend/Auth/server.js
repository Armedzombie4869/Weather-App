const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/UserRoutes');
const cors = require('cors');
const passport = require('passport');
const app = express();


mongoose.connect('mongodb://localhost:27017/passport-jwt');
// mongoose.connect(process.env.MONGODB_SERVER)
mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB');
}).on('error',(err) => {
    console.log(err);
})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use(passport.initialize());

require('./auth/passport');

app.use('/',routes);

module.exports = app.listen(4000, (req,res) => {
    console.log('Server running at port 4000');
})