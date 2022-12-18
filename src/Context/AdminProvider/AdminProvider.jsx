import React, { createContext, useContext, useState } from 'react'

const AdminContext = createContext();

export const useAdminProvider = () => useContext(AdminContext);

const AdminProvider = ({ children }) => {


     const [userDataGlobal, setUserDataGlobal] = useState([])
     const [change, setChange] = useState(false)
     const [AllOrderData, setAllOrderData] = useState([])
     console.log('AllOrderData: ', AllOrderData);

     const FindActiveUser = (items) => {
          const activeUser = items.filter((user) => user.isActive);
          const activeUserCount = activeUser.length;
          return { activeUserCount, activeUser }
     }

     return (
          <AdminContext.Provider value={{ FindActiveUser, userDataGlobal, setUserDataGlobal, AllOrderData, setAllOrderData, change, setChange }}>
               {children}
          </AdminContext.Provider>
     )
}

export default AdminProvider