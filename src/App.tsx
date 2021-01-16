import React, { useState } from 'react';
import './App.css';
//Styles
import { AppBar, Container, LinearProgress, Toolbar, Typography } from '@material-ui/core'

import { Routes, Route } from 'react-router-dom';

import LaunchContainer from './components/Launch';
import LaunchDetailsContainer from './components/LaunchDetails';

function App() {
  const [loader, setLoader] = useState<boolean>(true)
  return (
    <div className="app">
      <div style={{display: loader ? 'block' : 'none'}}>
        <LinearProgress />
      </div>
      <AppBar position='static' style={{ backgroundColor: 'black', alignItems: 'center' }}>
        <Toolbar>
          <Typography variant='h3'>SpaceX</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 20 }}>
        <Routes>
          <Route path='/' element={<LaunchContainer setLoader={setLoader} />} />
          <Route path='/launch/:flightNumber' element={<LaunchDetailsContainer setLoader={setLoader} />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
