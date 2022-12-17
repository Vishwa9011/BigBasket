import React, { useContext, createContext, useEffect, useState } from 'react'
import { useAuth } from '../AuthContext/AuthContextProvider'
import { db } from '../../Component/Firebase/firebase-config'
import { getDocs, collection } from 'firebase/firestore'


const ProviderContext = createContext()
export const useProvider = () => useContext(ProviderContext)

const Provider = ({ children }) => {

     const { currentUser } = useAuth()
     const [cartItemCount, setCartItemCount] = useState(0);
     const usersCollectionRef = collection(db, `cart/${currentUser?.email}/cartData`);
     const [cartCountChange, setCartCountChange] = useState(false)

     // * to get all the cart item on first time or on every change
     useEffect(() => {
          getDocs(usersCollectionRef)
               .then(res => {
                    const temp = (res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                    setCartItemCount(temp.length)
               })
     }, [cartCountChange, currentUser])

     return (
          <ProviderContext.Provider value={{ cartItemCount, setCartCountChange, setCartItemCount }}>
               {children}
          </ProviderContext.Provider>
     )
}

export default Provider