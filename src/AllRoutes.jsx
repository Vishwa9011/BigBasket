import PageNotFound from './Component/Pages/PageNotFound'
import Dashoboard from './Component/Pages/Dashoboard'
import AdminPanel from './Component/Pages/Admin/AdminPanel'
import Products from './Component/Pages/Products'
import MyOrders from './Component/Pages/MyOrders'
import { Routes, Route } from 'react-router-dom'
import Login from './Component/Pages/Login'
import Cart from './Component/Pages/Cart'
import PrivateRoute from './PrivateRoute';
import React from 'react'
import AdminRoutes from './Component/Pages/Admin/AdminRoutes'
const AllRoutes = () => {
     return (
          <Routes>
               <Route path='/' element={<Dashoboard />} />
               <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
               <Route path='/login' element={<Login />} />
               <Route path='/admin/*' element={<PrivateRoute><AdminPanel /></PrivateRoute>}>
                    <Route path='/admin/*' element={<AdminRoutes />} />
               </Route>
               <Route path='/myorders' element={<PrivateRoute><MyOrders /></PrivateRoute>} />
               <Route path='/products/:id' element={<Products />} />
               <Route path='*' element={<PageNotFound />} />
          </Routes>
     )
}

export default AllRoutes