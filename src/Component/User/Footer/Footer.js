import { Box } from '@mui/material'
import React from 'react'
import './Footer.scss'


const Footer = () => {
    return (
        <>
            <Box className='footerMain'>
                <Box className="footer">
                    <Box className="fLists">
                        <ul className="fList">
                            <li className="fListItem">Countries</li>
                            <li className="fListItem">Regions</li>
                            <li className="fListItem">Cities</li>
                            <li className="fListItem">Districts</li>
                            <li className="fListItem">Hotels</li>
                        </ul>
                        <ul className="fList">
                            <li className="fListItem">Homes </li>
                            <li className="fListItem">Apartments </li>
                            <li className="fListItem">Resorts </li>
                            <li className="fListItem">Villas</li>
                            <li className="fListItem">Hostels</li>
                            <li className="fListItem">Guest houses</li>
                        </ul>
                        <ul className="fList">
                            <li className="fListItem">Unique places to stay </li>
                            <li className="fListItem">Reviews</li>
                            <li className="fListItem">Unpacked: Travel articles </li>
                            <li className="fListItem">Travel communities </li>
                            <li className="fListItem">Seasonal and holiday deals </li>
                        </ul>
                        <ul className="fList">
                            <li className="fListItem">Investor relations</li>
                            <li className="fListItem">Terms & conditions</li>
                        </ul>
                    </Box>
                    <Box className="fText">Copyright © 2022 Hotelbooking.</Box>
                </Box>
            </Box>

        </>
    )
}

export default Footer
