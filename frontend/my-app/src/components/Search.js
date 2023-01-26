import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './config';
import WeatherCard from './WeatherCard';
import WeatherDetail from './WeatheDetail';
import '../css/Search.css';


export default function Search() {
         
    const [city, setCity] = useState('New Delhi');
   
    let navigate = useNavigate();
    const [input, setInput] = useState('');
    
    
    const [weather, setWeather] = useState();
    useEffect(() => {
        axios.get(`${config.apiURL}${city}`).then(response =>
            setWeather(response.data)
        )
        
    }, [city])

    useEffect(()=> {
        if(localStorage.length !== 0) {
            const token = localStorage.getItem('token');
            axios.get(`${config.authURL}profile`,{headers: {
                Authorization: token
               }}).then(res =>{
                console.log(res)
                setCity(res.data.user.city);
               //  setUser(res.data.user);
               }).catch(err => {
                console.log(err);
               //  navigate('/login');
        })
        }
    
       },[]);


    function sendCity() {
        setCity(input);
    }
    

    function Addtolist() {
        const token = localStorage.getItem('token');
        axios.post(`${config.authURL}addtolist`, { city }, {
            headers: {
                Authorization: token
            }
        }).then(data => alert('Item Added to Watchlist')).catch(err => navigate('/login'));
    }



    return (
        <div className="container-fluid">
            <div className="row height d-flex justify-content-center align-items-center">

                <div className="col-md-8">

                    <div className="search">
                        <i className="fa fa-search"></i>
                        <input type="text" className="form-control" placeholder="Search City" onChange= {(e) => setInput(e.target.value)} />
                        <button className="btn btn-dark" onClick={sendCity}>Search</button>
                    </div>

                </div>

            </div>
            
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
                            <button className="btn btn-dark btn-lg mt-2" onClick={Addtolist} >Add to watchlist</button>
                        </div>
                        </div>
                        


                    </div>


                ) : (<p></p>)}
            </div>
        </div>
    )
}
