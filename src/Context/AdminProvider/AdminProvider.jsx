import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../../Component/Firebase/firebase-config';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
const AdminContext = createContext();

export const useAdminProvider = () => useContext(AdminContext);

const AdminProvider = ({ children }) => {

     const [globalData, setGlobalData] = useState({ users: "", orders: "", activeUserCount: "" })
     console.log('globalData: ', globalData);


     // *all orders from all users
     useEffect(() => {
          // * for realtime update
          const userCollectionRef = collection(db, "orders");
          const unsubscribe = onSnapshot(userCollectionRef, (snapShot) => {
               var temp = [];
               snapShot.docs.forEach((doc) => {
                    temp.push({ id: doc.id, ...doc.data() })
               })
               setGlobalData(prev => ({ ...prev, orders: [...temp] }))
          }, (error) => console.log(error))

          // * cleanup function
          return unsubscribe
     }, [])


     // * to get all the users from data base;
     useEffect(() => {
          // * for realtime update
          const userCollectionRef = collection(db, "users");
          const unsubscribe = onSnapshot(userCollectionRef, (snapShot) => {
               var temp = [];
               snapShot.docs.forEach((doc) => {
                    temp.push({ id: doc.id, ...doc.data() })
               })
               FindActiveUser(temp)
               setGlobalData(prev => ({ ...prev, users: [...temp] }))
          }, (error) => console.log(error))

          // * cleanup function
          return unsubscribe
     }, [])


     const FindActiveUser = (items) => {
          console.log('items: ', items);
          const activeUser = items.filter((user) => user.isActive);
          console.log('activeUser: ', activeUser);
          const activeUserCount = activeUser.length;
          setGlobalData(prev => ({ ...prev, activeUserCount: activeUserCount, activeUser: activeUser }))
     }


     return (
          <AdminContext.Provider value={{ globalData }}>
               {children}
          </AdminContext.Provider>
     )
}

export default AdminProvider