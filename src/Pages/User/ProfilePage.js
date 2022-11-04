import NavBar from '../../Component/User/NavBar/NavBar'
import Banner from '../../Component/User/Banner/Banner'
import Footer from '../../Component/User/Footer/Footer'
import Profile from '../../Component/User/Profile'

const ProfilePage = () =>{
    return(
        <>
        <NavBar/>
        <Banner type="list"/>
        <Profile/>
        <Footer/>
        </>
    )
}

export default ProfilePage