import React from 'react'

import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';
import Dashboard from './Dashboard';

const navBarHeight = 40;

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Home/>}/>
          <Route path="/" element={<Navigate to ="/login" />}/>
          <Route path="/home" element={<Navigate to ="/login" />}/>
          <Route path="/dashboard" element={<Dashboard navBarHeight={navBarHeight} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
