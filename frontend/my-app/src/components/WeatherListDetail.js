import React, { useEffect, useState } from 'react'
import {useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import config from './config';
import WeatherCard from './WeatherCard';
import WeatherDetail from './WeatheDetail';
import '../css/Search.css';


export default function WeatherListDetail() {
   const location = useLocation();
   const city = location.state.name;
   
   
    let navigate = useNavigate();
    
    const [weather, setWeather] = useState();
    useEffect(() => {
        axios.get(`${config.apiURL}${city}`).then(response =>
            setWeather(response.data)
        )
        
       
    }, [city])

    return (
        <div className="container-fluid pt-5">
            
            <div>
                {weather !== undefined ? (
                    <div className="container">
                        <div className="row">
                            <div className='col'>
                                <WeatherCard weatherData={weather} city={city} />
                            </div>
                            <div className='col-8 shadow-lg rounded-3'>
                                <WeatherDetail weatherData={weather} />
                            </div>
                            <div>
                            <button className="btn btn-dark btn-lg mt-2" onClick={() => navigate('/watchlist')} >Go back</button>
                        </div>
                        </div>
                        


                    </div>
                ) : (<p></p>)}
            </div>
        </div>
    )
}
