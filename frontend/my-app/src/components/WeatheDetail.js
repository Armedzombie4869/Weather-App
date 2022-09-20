import React from "react";
import moment from 'moment';
import "../css/WeatherDetail.css";

const WeatherDetail = ({ weatherData }) => {
    const getTime = (time) => moment.unix(time).format("LT").substring(0, 5);

    return (
        <div className="detailed-container">
            <h2 className="detailed-heading">Today's Highlights</h2>
            <div className="detailed-info">
                <div className="temp_max card">
                    <div className="label">Max</div>
                    <div className="data">
                        {weatherData.main.temp_max}
                        <span className="unit">&deg;C</span>{" "}
                    </div>
                </div>
                <div className="temp_min card">
                    <div className="label">Min</div>
                    <div className="data">
                        {weatherData.main.temp_min}
                        <span className="unit">&deg;C</span>{" "}
                    </div>
                </div>
                <div className="sunrise card">
                    <div className="label">Sunrise</div>
                    <div className="data">
                        {getTime(weatherData.sys.sunrise)}
                        <span className="unit">AM</span>{" "}
                    </div>
                </div>
                <div className="sunset card">
                    <div className="label">Sunset</div>
                    <div className="data">
                        {getTime(weatherData.sys.sunset)}
                        <span className="unit">PM</span>{" "}
                    </div>
                </div>
                <div className="humidity card">
                    <div className="label">Humidity</div>
                    <div className="data">
                        {weatherData.main.humidity}
                        <span className="unit">%</span>{" "}
                    </div>
                </div>
                <div className="pressure card">
                    <div className="label">Pressure</div>
                    <div className="data">
                        {weatherData.main.pressure}
                        <span className="unit">bar</span>{" "}
                    </div>
                </div>
                <div className="windspeed card">
                    <div className="label">Windspeed</div>
                    <div className="data">
                        {weatherData.wind.speed}
                        <span className="unit">m/s</span>{" "}
                    </div>
                </div>
                <div className="rain card">
                    <div className="label">Clouds</div>
                    <div className="data">
                        {weatherData.clouds.all}
                        <span className="unit">%</span>{" "}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default WeatherDetail;