const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/WeatherRoutes');
const app = express();

app.use(bodyparser.json());
app.use(cors());
// app.use(bodyparser.urlencoded({extended: true}))

app.use('/',routes);

module.exports = app.listen(8000,() => {
    console.log('Server is running at port 8000');
})

