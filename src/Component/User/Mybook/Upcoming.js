import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import moment from 'moment'
import './Upcoming.scss'

const Upcoming = ({ upcoming, cancelled, completed, onCancel, value}) => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        const fetch = () => {
            if (upcoming) {
                setProduct(upcoming)
            } else if (cancelled) {
                setProduct(cancelled)
            } else if (completed) {
                setProduct(completed)
            }
        }
        fetch()
    }, [upcoming, cancelled, completed])

    return (
        <>
            {product?.map((item) => (
                <Box className='UpcomingItem' key={item._id}>
                    <img
                        src={item.room.images[0][0].url}
                        className="siImg"
                    />
                    <Box className='siDesc'>
                        <Typography className='siTitle'>{item.property.property_name}</Typography>
                        <Typography className="siDistance">{item.room.room_name}</Typography>
                        <Typography className="siTaxiOp">{item.room.price}</Typography>
                        <Typography className="siSubtitle">
                            {item.property.address}
                        </Typography>
                        <Typography className="siFeatures" sx={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '20px' }}> Booing ID:<Typography>{item.bookingId}</Typography></Typography>
                        <Typography className='siCancelOp'>Free cancellation</Typography>
                        <Typography className='siCancelOpSubtitle'>You can cancel later, so lock in this great price today!</Typography>
                    </Box>
                   { !item.cancel && !item.completed && <Box className="siDetails">
                        <Box className="siRating">
                            <Typography sx={{ fontSize: '25px' }}>Booking Dates</Typography>
                            <Box className="date">
                                <Typography sx={{fontSize:'20px'}}>{moment(item.Date.startDate).format("ddd,ll")}</Typography>
                                <Typography sx={{fontWeight:'bold',fontSize:'20px'}}>To</Typography>
                                <Typography sx={{fontSize:'20px'}}>{moment(item.Date.endDate).format("ddd, ll")}</Typography>
                            </Box>
                        </Box>
                        <Box className="siDetailTexts">
                            {/* <Typography className="siPrice">₹ {days*item.price*options.room }</Typography> */}
                            {/* <Typography className="siTaxOp">Includes taxes and fees</Typography> */}
                           {item.isBooked && <Button className="siCheckButton" type="submit" onClick={()=>{onCancel(item._id)}}>Cancel</Button>}
                        </Box>
                    </Box>}

                </Box>))}
        </>
    )
}
export default Upcoming