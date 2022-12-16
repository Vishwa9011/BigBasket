import { useToast } from '@chakra-ui/react';
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Component/Firebase/firebase-config';
import { useAuth } from '../AuthContext/AuthContextProvider';

const GlobalContext = createContext();

export const useGlobal = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

     const toast = useToast()
     const { currentUser } = useAuth()
     const [cartItemCount, setCartItemCount] = useState(0);
     const [showDataForCategory, setShowDataForCategory] = useState("");
     const usersCollectionRef = collection(db, `cart/${currentUser?.email}/cartData`)
     const [cartCountChange, setCartCountChange] = useState(false)

     const showMsg = (msg, msgType) => {
          return toast({
               title: msg,
               position: 'top', variant: 'left-accent',
               status: msgType, isClosable: true,
          })
     }

     // * to get all the cart item on first time or on every change
     useEffect(() => {
          const getData = () => {
               if (!currentUser.email) return
               getDocs(usersCollectionRef)
                    .then(res => {
                         const data = (res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                         console.log('data: ', data);
                         setCartItemCount(data.length)
                    })
          }
          getData();
     }, [cartCountChange])



     return (
          <GlobalContext.Provider value={{ setCartCountChange, cartItemCount, showMsg, showDataForCategory, setShowDataForCategory }}>
               {children}
          </GlobalContext.Provider>
     )
}

export default GlobalProvider