import React, { createContext, useState, useContext, useEffect } from 'react';

// create context 

const CoordinatesContext = createContext();

//create custom hook useCoordinates for  manage latitude and longitude data

export const useCoordinates = () => {
  return useContext(CoordinatesContext);
};

export const CoordinatesProvider = ({ children }) => {
  const [latitude, setLatitude] = useState(localStorage.getItem('lastLatitude') || '');
  const [longitude, setLongitude] = useState(localStorage.getItem('lastLongitude') || '');

  useEffect(() => {
    // set value  in  local storage  when input is change 
    localStorage.setItem('lastLatitude', latitude);
    localStorage.setItem('lastLongitude', longitude);
  }, [latitude, longitude]);

  // set latitude and longitude state by call back function 
  const setCoordinates = (newLatitude, newLongitude) => {
    setLatitude(newLatitude);
    setLongitude(newLongitude);
  };

  const contextValue = {
    latitude,
    longitude,
    setCoordinates,
  };

  return (
    // provide context value to   children component
    <CoordinatesContext.Provider value={contextValue}>
      {children}
    </CoordinatesContext.Provider>
  );
};
