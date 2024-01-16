
import './App.css';
import React, {Fragment } from 'react'
import Weather from './component/Weather';
import { CoordinatesProvider } from './component/CoordinatesContext';

function App() {
  return (
    <Fragment>
      <CoordinatesProvider>
      <Weather/>
      </CoordinatesProvider>
    </Fragment>
  );
};

export default App;
