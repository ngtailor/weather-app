
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useCoordinates } from './CoordinatesContext';

function Weather() {

    const { latitude, longitude, setCoordinates } = useCoordinates();
  const [latitudeError, setLatitudeError] = useState('');
  const [longitudeError, setLongitudeError] = useState('');
  const [weather, setWeather] = useState(null);
  const [weatherCurrent, setWeatherCurrent] = useState(null);
  const [weatherError, setWeatherError] = useState('');

  

  useEffect(() => {
    // api call when latitude and longitude is input or change
    if (latitude && longitude) {
      getWeather();
    }
    else{
        setWeather(null)
        setWeatherCurrent(null)
    }
  }, [latitude, longitude]);

  const validateLatitude = (value) => {
    // check validation for latitude 
    const lat = parseFloat(value);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      setLatitudeError('Invalid latitude. Must be between -90 and 90.');
      return false;
    }
    setLatitudeError('');
    return true;
  };

  const validateLongitude = (value) => {
    //check validation for longitude 
    const lon = parseFloat(value);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      setLongitudeError('Invalid longitude. Must be between -180 and 180.');
      return false;
    }
    setLongitudeError('');
    return true;
  };

  const handleLatitudeChange = (e) => {
    const newLatitude = e.target.value;
    setCoordinates(newLatitude, longitude);
  };

  const handleLongitudeChange = (e) => {
    const newLongitude = e.target.value;
    setCoordinates(latitude, newLongitude);
  };

  const getCurrentLocation = () => {
    // To get the user's current location using geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = position.coords.latitude.toString();
        const currentLongitude = position.coords.longitude.toString();

        // setLatitude(currentLatitude);
        // setLongitude(currentLongitude);
        setCoordinates(currentLatitude, currentLongitude);
        setLatitudeError('');
        setLongitudeError('');
      },
      (error) => {
        console.error('Error getting current location:', error);
        setLatitudeError('Error getting current location.');
        setLongitudeError('Error getting current location.');
      }
    );
  };

  const getWeather = async () => {
    // call api for current weather and  latitude or longitude
    if (!validateLatitude(latitude) || !validateLongitude(longitude)) {
      setWeatherError('Invalid latitude or longitude. Please enter valid values.');
      return;
    }

    const apiUrl = `https://weatherapi-com.p.rapidapi.com/current.json?&q=${latitude},${longitude}`;
      let config = {
        headers: {'X-RapidAPI-Key': '677fa8ef55msh12c799620d55df4p13296djsn3a8a9901fac2','X-RapidAPI-Host':'weatherapi-com.p.rapidapi.com'
      },
    }
    
    try {
      const response = await axios.get(apiUrl, config)

      if (response.status === 200) {
        console.log(response)
        setWeather(response.data.location);
        setWeatherCurrent(response.data.current)
        setWeatherError('');
      } else {
        setWeatherError(`Error: ${response.data.error.message}`);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherError('Error fetching weather data.');
    }
   

  };

  return (
    <div>
        <div className="weather-heading">
      <h2>Weather Information</h2>
    </div>
      <label>Latitude:</label>
      <input type="text" placeholder="Enter latitude"  value={latitude}  onChange={handleLatitudeChange}/>
      {latitudeError && <p style={{ color: 'red' }}>{latitudeError}</p>}

      <label>Longitude:</label>
      <input type="text"  placeholder="Enter longitude"  value={longitude}  onChange={handleLongitudeChange}/>
      {longitudeError && <p style={{ color: 'red' }}>{longitudeError}</p>}

      <button onClick={getCurrentLocation}>Get Current Location</button>
      <button onClick={getWeather}>Get Current Weather</button>
      
      {weather && weatherCurrent && (
        
        <div className='weather-info '>
        <p>Location Name:{weather.name}</p>
        <p>Region:{weather.region}</p>
        <p>Country:{weather.country}</p>
        <p>Celsius: {weatherCurrent.temp_c}</p>
        <p>Fahrenheit:{weatherCurrent.temp_f}</p>
        <p>Humidity:{weatherCurrent.humidity}</p>
        <p>feels like: {weatherCurrent.feelslike_c}</p>
        <p> wind speed:{weatherCurrent.wind_kph}</p>
        </div> 
      )}

      {weatherError && <p style={{ color: 'red' }}>{weatherError}</p>}
    </div>
  );
};

export default Weather;
