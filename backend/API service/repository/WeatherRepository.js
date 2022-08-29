
const fetch =require('node-fetch');
const config = require('../config');
function GetWeather(city) {
    const url = config.apiURL+city+'&appid='+config.apiKey+'&units=metric';
    return new Promise((resolve,reject) => {
        fetch(url).then((res)=>{
            resolve(res.json());
        })
        .catch((err)=> {
            reject({status:404,message:err})
        })
    })
     
    
}

module.exports = {GetWeather};