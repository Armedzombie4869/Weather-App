import * as React from 'react';
import '../css/WeatherCard.css';

export default function WeatherCard({weatherData,city}) {
    const d = new Date();
    const dayNumber = d.getDay();
    const dateNumber = d.getDate();
    const monthNumber = d.getMonth();
    const day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
  return (
    <div className="currentday-container">
           
            <div className="description">{weatherData.weather[0].main}</div>
            <div className="temperature">
            {weatherData.main.temp}
                <span className="degree">&deg;C</span>
            </div>
            <div className="feelslike">
            Feels like {weatherData.main.feels_like}&deg;
            </div>
            <div className="infomatics">
                <div className="date">
                    <div className="icon">
                        <i className="fas fa-calendar-day"></i>
                    </div>
                    <p>{`${day[dayNumber]}, ${dateNumber} ${month[monthNumber]}`}</p>
                </div>
                <div className="location">
                    <div className="icon">
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <p>
                        {city}
                    </p>
                </div>
                
            </div>
        </div>
   
  );
}
