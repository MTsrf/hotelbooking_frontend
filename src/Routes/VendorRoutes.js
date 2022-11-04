import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import VendorHomePage from '../Pages/Vendor/VendorHomePage'
import { useSelector } from 'react-redux'
import MainLayout from '../Component/Vendor/Layout/MainLayout'
const VendorRoutes = () => {
  const { vendor } = useSelector((vendor) => ({ ...vendor }))

  const PublicRouter = ({ children }) => {
    if (vendor) {
      return <Navigate to="/vendor/home" />
    }
    return children
  }
  const PrivateRouter = ({ children }) => {
    if ( !vendor) {
      return <Navigate to='/vendor' />
    }
    return children
  }
  return (
    <React.Fragment>
      <Routes>
        <Route exact path='/' element={
          <PublicRouter>
            <VendorHomePage />
          </PublicRouter>
        } />

        <Route path='/home/*' element={
          <PrivateRouter>
            <MainLayout />
          </PrivateRouter>
        } />
      </Routes>
    </React.Fragment>
  )
}

export default VendorRoutes
