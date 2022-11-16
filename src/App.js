import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Dashboard from './Dashboard';
import Navbar from './Navbar';

const navBarHeight = 32;

function App() {
  return (
    <ChakraProvider>
      <Dashboard navBarHeight={navBarHeight}/>
    </ChakraProvider>
  );
}

export default App;
