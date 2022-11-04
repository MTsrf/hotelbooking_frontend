import React, { Fragment } from 'react'
import Banner from '../../Component/User/Banner/Banner'
import Footer from '../../Component/User/Footer/Footer'
import Main from '../../Component/User/MainPage'
import NavBar from '../../Component/User/NavBar/NavBar'

const UserHomePage = () => {
  return (
    <Fragment>
      <NavBar/>
      <Banner/>
      <Main/>
      <Footer/>
    </Fragment>
  )
}

export default UserHomePage
