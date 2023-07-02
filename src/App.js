import './App.css';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Outlet />
    </ChakraProvider>
  );
}

export default App;
