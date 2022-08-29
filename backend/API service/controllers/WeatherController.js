const fetch =require('node-fetch');
const repo = require('../repository/WeatherRepository');

function HomePage(req,res) {
    res.send('Home Page');
}

async function GetWeather(req,res){
    repo.GetWeather(req.params.city).then(data => {
        res.send(data);
    });
}


module.exports = {GetWeather,HomePage};