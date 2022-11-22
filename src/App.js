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
  const [token, changeToken] = useState("")

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home auth={auth} setAuth={setAuth} changeToken={changeToken} />} />
          <Route path="/dashboard" element={<Dashboard setAuth={setAuth} token={token} changeToken={changeToken} navBarHeight={navBarHeight} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
