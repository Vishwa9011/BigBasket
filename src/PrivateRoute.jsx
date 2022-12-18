import { isAdmin } from '@firebase/util'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Context/AuthContext/AuthContextProvider'

const PrivateRoute = ({ children }) => {
     const isAuth = JSON.parse(localStorage.getItem('isAuth')) || false
     const navigate = useNavigate()
     const { currentUserDetail } = useAuth()

     // * preventing the page
     useEffect(() => {
          if (!isAuth) return navigate('/login', "login")
          else if (isAuth && !currentUserDetail.isAdmin) return navigate("/", "/")
     }, [isAuth])

     return children;
}

export default PrivateRoute