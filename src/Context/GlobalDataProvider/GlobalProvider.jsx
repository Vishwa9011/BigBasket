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
 
     const capitalize = (value, type = '#') => {
          if (!value) return
          value = value.trim();
          // * ("*") all letters capitalize 
          if (type == '*') {
               const valueArr = value.split(" ");
               // * capitalize each word in string
               const resultArr = valueArr.map((val) => {
                    return val.slice(0, 1).toUpperCase() + val.slice(1);
               })
               return resultArr.join(" ");
          } // * {"#"} for only first letter capitalze
          else if (type == '#') {
               return value.slice(0, 1).toUpperCase() + value.slice(1);
          }
     }


     return (
          <GlobalContext.Provider value={{ showMsg, capitalize, showDataForCategory, setShowDataForCategory }}>
               {children}
          </GlobalContext.Provider>
     )
}

export default GlobalProvider