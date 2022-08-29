
const express= require('express');
const router = express.Router();
const {GetWeather,HomePage} = require('../controllers/WeatherController')

router.get('/',HomePage);

router.get('/getweather/:city', GetWeather );
    
module.exports = router;