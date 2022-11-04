import Banner from "../../Component/User/Banner/Banner"
import Booking from "../../Component/User/Booking"
import NavBar from "../../Component/User/NavBar/NavBar"
import Footer from "../../Component/User/Footer/Footer"


const BookingPage = () => {

   return (
      <>
         <NavBar/>
         <Banner type="list" />
         <Booking/>
         <Footer />
      </>
   )
}

export default BookingPage