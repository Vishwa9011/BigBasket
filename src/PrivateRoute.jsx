import { isAdmin } from '@firebase/util'
import React, { useEffect } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from './Context/AuthContext/AuthContextProvider'

const PrivateRoute = ({ children }) => {
     const isAuth = JSON.parse(localStorage.getItem('isAuth')) || false
     const navigate = useNavigate()
     const location = useLocation()
     console.log('location: ', location);
     const { currentUserDetail } = useAuth()
     const param = useSearchParams()
     console.log('param: ', param);

     // * preventing the page
     useEffect(() => {
          if (!isAuth) return navigate('/login', "login")
          else if (isAuth && !currentUserDetail.isAdmin && location.pathname === '/admin') return navigate("/", "/")
     }, [isAuth])

     return children;
}

export default PrivateRoute