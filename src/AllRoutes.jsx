import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cart from './Component/Pages/Cart'
import Dashoboard from './Component/Pages/Dashoboard'
import Products from './Component/Pages/Products'
import Login from './Component/Pages/Login'
import PrivateRoute from './PrivateRoute';

const AllRoutes = () => {
     return (
          <Routes>
               <Route path='/' element={<Dashoboard />} />
               <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
               <Route path='/login' element={<Login />} />
               <Route path='/products/:id' element={<Products />} />
          </Routes>
     )
}

export default AllRoutes