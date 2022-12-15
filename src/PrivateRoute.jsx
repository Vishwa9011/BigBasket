import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Context/AuthContextProvider'

const PrivateRoute = ({ children }) => {

     const navigate = useNavigate()
     const { currentUser, isAuth } = useAuth()

     useEffect(() => {
          if (!isAuth) return navigate('/login')
     }, [isAuth])

     return children;
}

export default PrivateRoute