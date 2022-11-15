import { Box } from '@mui/material'
import React from 'react'
import Banner from '../../Component/User/Banner/Banner'
import FilterBar from '../../Component/User/BookingBar'
import NavBar from '../../Component/User/NavBar/NavBar'
import SearchHotel from '../../Component/User/Search'

const SearchPage = () => {
  return (
    <Box>
      <NavBar />
      <Banner type="list" />
      <FilterBar type="list" />
      <SearchHotel />
    </Box>
  )
}

export default SearchPage
