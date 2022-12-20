import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminAbout from './AdminAbout'
import AdminDashboard from './AdminDashboard'
import AdminMessages from './AdminMessages'
import AdminOrder from './AdminOrder'
import AdminUsers from './AdminUsers'

const AdminRoutes = () => {
     return (
          <Routes>
               <Route index element={<AdminDashboard />} />
               <Route path='dashboard' element={<AdminDashboard />} />
               <Route path='users' element={<AdminUsers />} />
               <Route path='orders' element={<AdminOrder />} />
               <Route path='about' element={<AdminAbout />} />
               <Route path='messages' element={<AdminMessages />} />
          </Routes>
     )
}

export default AdminRoutes