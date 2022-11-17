import React, { useState, useEffect } from 'react'

import logo from './logo.svg';
import './App.css';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';

import Home from './Home';
import Dashboard from './Dashboard';

const navBarHeight = 40;

function App() {

  const [auth, setAuth] = useState(true)

  function showDashboard() {
    if (auth)
      return (
        <Dashboard navBarHeight={navBarHeight} />)
    else
      return (
        <Home />
      )
  }

  return (
    <ChakraProvider>
      {showDashboard()}
    </ChakraProvider>
  );
}

export default App;
