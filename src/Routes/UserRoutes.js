import React, { Fragment } from 'react'
import { Route, Routes} from 'react-router-dom'
import BookingList from '../Pages/User/BookingList'
import BookingPage from '../Pages/User/BookingPage'
import PaymentPage from '../Pages/User/PaymentPage'
import ProfilePage from '../Pages/User/ProfilePage'
import SearchPage from '../Pages/User/SearchPage'
import SinglePage from '../Pages/User/SinglePage'
import UserHomePage from '../Pages/User/UserHomePage'
import UserLoginPage from '../Pages/User/UserLoginPage'


const UserRoutes = () => {
  return (
    <Fragment>
        <Routes>
            <Route exact path='/' element={<UserHomePage/>}/>
            <Route path='/login' element={<UserLoginPage/>}/>
            <Route path ='/hotel/:id' element={<SinglePage/>}/>
            <Route path='/hotel' element={<SearchPage/>}/>
            <Route path='/booking/:id' element={<BookingPage/>}/>
            <Route path='/payment/:rooms/:checkout' element={<PaymentPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/my-book' element={<BookingList/>}/>
        </Routes>
    </Fragment>
  )
}

export default UserRoutes
