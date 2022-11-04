import React from 'react'
import LoginHomeVendor from '../../Component/Vendor/HomeLogin/LoginHomeVendor'
import NavBarVendor from '../../Component/Vendor/HomeLogin/NavBarVendor'


const VendorHomePage = () => {
  return (
    <React.Fragment>
        <NavBarVendor/>
        <LoginHomeVendor/>
    </React.Fragment>
  )
}

export default VendorHomePage
