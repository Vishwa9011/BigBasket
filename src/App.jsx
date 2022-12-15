import './App.css'
import AllRoutes from './AllRoutes';
import axios from 'axios';
import { Message } from './Component/Message/Message';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuth } from './Context/AuthContextProvider'
import CrudOperation from './Component/Firebase/CrudOperation';
axios.defaults.baseURL = 'http://localhost:3000'

function App() {

  const toast = useToast()
  useEffect(() => {
    toast({
      title: `Welcome in BigBasket`, position: 'top', isClosable: true,
    })
  }, []);

  return (
    <>
      <AllRoutes />
      {/* <CrudOperation /> */}
      {/* <SliderCheck /> */}
    </>
  )
}

export default App
