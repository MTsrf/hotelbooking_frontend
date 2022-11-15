import Banner from "../../Component/User/Banner/Banner"
import Footer from "../../Component/User/Footer/Footer"
import MyBook from "../../Component/User/Mybook"
import NavBar from "../../Component/User/NavBar/NavBar"


const BookingList = () => {
    return (
        <>
            <NavBar />
            {/* <Banner type="list"/> */}
            <MyBook/>
            <Footer />
        </>
    )
}

export default BookingList