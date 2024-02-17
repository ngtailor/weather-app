import React from 'react'

const ShowWeather = ({dataFirst,dataSecond}) => {
  return (
    <div>
    {dataFirst && dataSecond && (
        <div className='weather-info '>
        <p>Location Name:{dataFirst.name}</p>
        <p>Region:{dataFirst.region}</p>
        <p>Country:{dataFirst.country}</p>
        <p>Celsius: {dataFirst.temp_c}</p>
        <p>Fahrenheit:{dataSecond.temp_f}</p>
        <p>Humidity:{dataSecond.humidity}</p>
        <p>feels like: {dataSecond.feelslike_c}</p>
        <p> wind speed:{dataSecond.wind_kph}</p>
        </div> 
      )} 
    </div>
   
  )
}

export default ShowWeather
