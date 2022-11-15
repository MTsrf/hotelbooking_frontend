import { Box, Grid } from "@mui/material";
import React from "react";
import Filter from "./Filter";
import './searchHotel.scss'
import SearchItem from "./SearchItem/SearchItem";
import { useLocation } from 'react-router-dom'
import { useState } from "react";
import useFetch from '../../../helper/useFetch'
import { useSelector } from "react-redux";

const SearchHotel = () => {
    const { search} = useSelector((state) => state.search)
    console.log(search);
    const location = useLocation()
    const [destination, setDestination] = useState(location.state.destination)
    const [dates, setDates] = useState(location.state.dates)
    const [options, setOptions] = useState(location.state.options)

    // const filterdata = store?.filter((item) => {
    //     return item.property.city === destination
    // })
    // console.log(filterdata);
    // console.log("hi",destination,dates,options);
    // const { data , error , loading } = useFetch(`/serachHotel?city=${destination}&date=${dates}&people=${options}`)

    return (
        <>
            <Box className="containerBox">
                <Box className="searchWrap">
                    {/* <Box className="filter">
                        <Filter />
                    </Box> */}
                    <Box className="listResult">
                        {
                            search?.map((item) => (
                                <SearchItem key={item._id} item={item}/>
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default SearchHotel