import Banner from "../../Component/User/Banner/Banner";
import Footer from "../../Component/User/Footer/Footer";
import NavBar from "../../Component/User/NavBar/NavBar";
import Payment from "../../Component/User/Payment";

const PaymentPage = () => {
    return (
        <>
            <NavBar/>
            <Banner type="list"/>
            <Payment/>
            <Footer/>
        </>
    )
}

export default PaymentPage