import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import config from './config';
import WeatherCard from './WeatherCard';
import WeatherDetail from './WeatheDetail';
import Search from './Search';

export default function Weather() {
  let navigate = useNavigate();
  let location = useLocation();
  const city = location.state.city.city;
  console.log(city)
  const [weather, setWeather] = useState();
  
  useEffect(() => {
    axios.get(`${config.apiURL}${city}`).then(response =>
      setWeather(response.data)
    )

  }, [])

  function Addtolist() {
    const token = localStorage.getItem('token');
    axios.post(`${config.authURL}addtolist`,{city},{headers: {
      Authorization: token
     }}).then(data => alert('Item Added to Watchlist')).catch(err => console.log(err));
  }

  return (
    <div className="container">
      <div className="row">
      <Search />
      </div>
      
      {weather !== undefined ? (
        <div className="container">
          <div className="row">
            <div className='col'>
              <WeatherCard weatherData={weather} city={city} />
            </div>
            <div className='col-8 shadow-lg rounded-3'>
              <WeatherDetail weatherData={weather} />
            </div>
          </div>
          <div>
            <button onClick={Addtolist} >Add to watchlist</button>
          </div>


        </div>


      ) : null}
    </div>

  )
}
