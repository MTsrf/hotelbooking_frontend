import { Box, Button, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './SearchItem.scss'


const SearchItem = ({item}) => {
    const navigate = useNavigate()
    const { dates,options } = useSelector(state=>state.search)

    const days = moment(dates[0].endDate).diff(moment(dates[0].startDate), 'days');
    return (
        <>
            <Box className='searchItem'>
                <img
                    src={item.images[0][0].url}
                    className="siImg"
                />
                <Box className='siDesc'>
                    <Typography className='siTitle'>{item.property.property_name}</Typography>
                    <Typography className="siDistance">{item.property.city}</Typography>
                    <Typography className="siTaxiOp">{item.view}</Typography>
                    <Typography className="siSubtitle">
                        {item.property.property_details.substring(0,100)}
                    </Typography>
                    <Typography className="siFeatures"> Entire studio • 1 bathroom • 21m² 1 full bed</Typography>
                    <Typography className='siCancelOp'>Free cancellation</Typography>
                    <Typography className='siCancelOpSubtitle'>You can cancel later, so lock in this great price today!</Typography>
                    <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'red'}}>{`Only ${item.roomNumbers} rooms left at this hotel`}</Typography>
                </Box>
                <Box className="siDetails">
                    <Box className="siRating">
                        <Typography></Typography>
                        {/* <Typography className='text'>Excellent</Typography>
                        <Button className='btn'>8.9</Button> */}
                    </Box>
                    <Box className="siDetailTexts">
                        <Typography className="siPrice">₹ {days*item.price*options.room }</Typography>
                        <Typography className="siTaxOp">Includes taxes and fees</Typography>
                        <Button className="siCheckButton" onClick={()=>{navigate(`/hotel/${item._id}`)}}>See availability</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default SearchItem
