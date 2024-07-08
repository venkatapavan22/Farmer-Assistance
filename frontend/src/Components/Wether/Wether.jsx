import { useState } from "react";
import { FaWater, FaWind } from "react-icons/fa";
import clear from '../../assets/clear.png';
import cloud from '../../assets/cloud.png';
import mist from '../../assets/mist.png';
import rain from '../../assets/rain.png';
import snow from '../../assets/snow.png';
import errorImage from '../../assets/404.png';
import weatherBg from '../../assets/weatherbg.jpg'; // Default background
import clearBg from '../../assets/clearBg.jpg';
import rainBg from '../../assets/rainBg.jpg';
import snowBg from '../../assets/snowBg.jpg';
import cloudBg from '../../assets/cloudBg.jpg';
import mistBg from '../../assets/mistBg.jpg';

import { CiLocationArrow1 } from "react-icons/ci";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);
    const APIKey = "c18cde0bc9bea3b63eb1ba759c738bf9";

    const fetchWeather = () => {
        if (city === "") return;

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
        )
            .then((response) => response.json())
            .then((json) => {
                if (json.cod === "404") {
                    setError(true);
                    setWeather(null);
                    return;
                }
                setError(false);
                setWeather(json);
            });
    };

    const getWeatherIcon = (main) => {
        switch (main) {
            case "Clear":
                return clear;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clouds":
                return cloud;
            case "Haze":
                return mist;
            default:
                return null;
        }
    };

    const getWeatherBackground = (main) => {
        switch (main) {
            case "Clear":
                return clearBg;
            case "Rain":
                return rainBg;
            case "Snow":
                return snowBg;
            case "Clouds":
                return cloudBg;
            case "Haze":
                return mistBg;
            default:
                return weatherBg;
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchWeather();
        }
    };

    const background = weather ? getWeatherBackground(weather.weather[0].main) : weatherBg;
    const animationClass = weather && weather.weather[0].main === "Clouds" ? "clouds-animation" : "";

    return (
        <div className={`flex h-screen items-center justify-center ${animationClass}`} style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPositionY: '-14rem' }}>
            <div className="glass relative w-96 p-4 rounded-2xl shadow-lg">
                <div className="search-box flex items-center">
                    <CiLocationArrow1 className="mr-2 text-4xl text-gray-800" />
                    <input
                        type="text"
                        placeholder="Enter your location"
                        className="glass w-full p-2 text-xl font-medium text-gray-800 placeholder-gray-800 uppercase border-none outline-none"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="ml-2 p-2 text-xl text-gray-800 bg-teal-200 rounded-full transition-colors duration-300 hover:bg-gray-800 hover:text-white"
                        onClick={fetchWeather}
                    >
                        <HiMagnifyingGlass size={24} />
                    </button>
                </div>

                {error && (
                    <div className="not-found text-center animate-fadeIn py-6">
                        <img src={errorImage} alt="Not found" className="mx-auto mb-4 w-3/5" />
                        <p className="text-2xl font-medium text-gray-800">Oops! Invalid location :/</p>
                    </div>
                )}

                {weather && (
                    <>
                        <div className="weather-box text-center animate-fadeIn">
                            <img
                                src={getWeatherIcon(weather.weather[0].main)}
                                alt={weather.weather[0].main}
                                className="mx-auto mb-4 w-1/2"
                            />
                            <p className="temperature text-4xl font-bold text-gray-800">
                                {parseInt(weather.main.temp)}
                                <span className="text-xl">°C</span>
                            </p>
                            <p className="description text-2xl font-medium text-gray-800 capitalize">
                                {weather.weather[0].description}
                            </p>
                        </div>
                        <div className="weather-details flex justify-around mt-8 animate-fadeIn">
                            <div className="humidity flex flex-col items-center">
                                <FaWater className="mb-2 text-2xl text-gray-800" />
                                <div className="text-center">
                                    <span className="text-xl text-gray-800">{weather.main.humidity}%</span>
                                    <p className="text-sm font-medium text-gray-800">Humidity</p>
                                </div>
                            </div>
                            <div className="wind flex flex-col items-center">
                                <FaWind className="mb-2 text-2xl text-gray-800" />
                                <div className="text-center">
                                    <span className="text-xl text-gray-800">{parseInt(weather.wind.speed)} Km/h</span>
                                    <p className="text-sm font-medium text-gray-800">Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Weather;
