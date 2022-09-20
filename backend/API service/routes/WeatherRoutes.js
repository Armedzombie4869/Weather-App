
const express= require('express');
const router = express.Router();
const {GetWeather} = require('../controllers/WeatherController')

router.get('/getweather/:city', GetWeather );
    
module.exports = router;