import React, { useState, useEffect } from 'react'

import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Dashboard from './Dashboard';

const navBarHeight = 40;

function App() {

  const [auth, setAuth] = useState(false)

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home auth={auth} setAuth={setAuth} />} />
          <Route path="/dashboard" element={<Dashboard setAuth={setAuth} navBarHeight={navBarHeight} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
