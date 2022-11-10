import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Main from './Main';
import Navbar from './Navbar';

function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Main />
    </ChakraProvider>
  );
}

export default App;
