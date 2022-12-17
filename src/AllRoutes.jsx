import PageNotFound from './Component/Pages/PageNotFound'
import Dashoboard from './Component/Pages/Dashoboard'
import Products from './Component/Pages/Products'
import MyOrders from './Component/Pages/MyOrders'
import { Routes, Route } from 'react-router-dom'
import Login from './Component/Pages/Login'
import Cart from './Component/Pages/Cart'
import PrivateRoute from './PrivateRoute';
import React from 'react'

const AllRoutes = () => {
     return (
          <Routes>
               <Route path='/' element={<Dashoboard />} />
               <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
               <Route path='/login' element={<Login />} />
               <Route path='/myorders' element={<MyOrders />} />
               <Route path='/products/:id' element={<Products />} />
               <Route path='*' element={<PageNotFound />} />
          </Routes>
     )
}

export default AllRoutes