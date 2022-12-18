import './App.css'
import AllRoutes from './AllRoutes';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import AdminPanel from './Component/Pages/Admin/AdminPanel';

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
      {/* <AdminPanel /> */}
    </>
  )
}

export default App
