const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./routes/UserRoutes');
const cors = require('cors');
const passport = require('passport');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use(passport.initialize());

require('./auth/passport');

app.use('/',routes);

app.listen(4000, (req,res) => {
    console.log('Server running at port 4000');
})