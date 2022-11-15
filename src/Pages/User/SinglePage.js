import { Box } from "@mui/material";
import React from "react";
import NavBar from "../../Component/User/NavBar/NavBar";
import Banner from '../../Component/User/Banner/Banner'
import HotelSingle from "../../Component/User/SinglePage";
import Footer from "../../Component/User/Footer/Footer";
import FilterBar from "../../Component/User/BookingBar";

const SinglePage = () => {
    return (
        <Box>
            <NavBar typ="list" />
            <Banner type="list" />
            <FilterBar type="list" />
            <HotelSingle />
            <Footer />
        </Box>
    )
}

export default SinglePage