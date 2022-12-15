import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Context/AuthContextProvider'

const PrivateRoute = ({ children }) => {

     const navigate = useNavigate()
     const { currentUser } = useAuth()

     if (!currentUser.email) return navigate('/login')

     return children;
}

export default PrivateRoute