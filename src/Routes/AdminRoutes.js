import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../Component/Admin/Dashboard/Dashboard'
import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
import CategoryPage from '../Pages/Admin/CategoryPage'
import { useSelector } from 'react-redux'
const AdminRoutes = () => {
  const { admin} = useSelector((admin) => ({ ...admin }))
  const PublicRouter = ({ children }) => {
    if (admin) {
      return <Navigate to="/admin/dashboard" />
    }
    return children
  }

  const PrivateRouter = ({ children }) => {
    if (!admin) {
      return <Navigate to="/admin" />
    }
    return children
  }

  return (
    <React.Fragment>
      <Routes>
        <Route exact path='/' element={
          <PublicRouter>
            <AdminLoginPage />
          </PublicRouter>
        } />
        <Route path='/dashboard/*' element={
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        } />
      </Routes>
    </React.Fragment>
  )
}

export default AdminRoutes
