import { isAdmin } from '@firebase/util'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Context/AuthContext/AuthContextProvider'

const PrivateRoute = ({ children }) => {

     const navigate = useNavigate()
     const { isAuth, isAdmin } = useAuth()

     // * preventing the page
     useEffect(() => {
          if (!isAuth) return navigate('/login', "login")
          else if (isAuth && !isAdmin) return navigate("/", "/")
     }, [isAuth])

     return children;
}

export default PrivateRoute