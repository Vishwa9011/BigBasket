import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cart from './Component/Pages/Cart'
import Dashoboard from './Component/Pages/Dashoboard'
import Product from './Component/Pages/Product'
import Login from './Component/Pages/Login'
import PrivateRoute from './PrivateRoute';

const AllRoutes = () => {
     return (
          <Routes>
               <Route path='/' element={<Dashoboard />} />
               <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
               <Route path='/login' element={<Login />} />
               <Route path='/product/:id' element={<Product />} />
          </Routes>
     )
}

export default AllRoutes