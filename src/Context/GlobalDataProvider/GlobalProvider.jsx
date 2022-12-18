import React, { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react';

const GlobalContext = createContext();

export const useGlobal = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

     const toast = useToast()
     const [showDataForCategory, setShowDataForCategory] = useState("");

     const showMsg = (msg, msgType) => {
          return toast({
               title: msg,
               position: 'top', variant: 'left-accent',
               status: msgType, isClosable: true,
          })
     }
 

     return (
          <GlobalContext.Provider value={{ showMsg, showDataForCategory, setShowDataForCategory }}>
               {children}
          </GlobalContext.Provider>
     )
}

export default GlobalProvider