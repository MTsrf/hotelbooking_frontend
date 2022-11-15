import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './hotel.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PreviewIcon from '@mui/icons-material/Preview';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';


const HotelSingle = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const store = useSelector((state) => state.store)
    const { search, destination, options, dates } = useSelector(state => state.search)
    const user = useSelector(state => state.user)
    console.log(user);
    const hotellist = store.find((item) => item._id === id)
    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false)

    const showToastMessage = () => {
        toast.error('Please Login Now!', {
            position: toast.POSITION.BOTTOM_CENTER
        });
    };

    const days = moment(dates[0].endDate).diff(moment(dates[0].startDate), 'days');
    const handleOpen = (index) => {
        setSlideNumber(index);
        setOpen(true)
    }
    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber)
    };
    return (
        <>
            <Box className='singleBox'>
                {
                    open && <Box className='sliderBoxSingle'>
                        <CloseIcon
                            className="close"
                            onClick={() => setOpen(false)}
                        />
                        <ArrowBackIcon
                            className="arrow"
                            onClick={() => handleMove("l")}
                        />
                        <Box className="sliderWrapper">
                            {
                                hotellist?.images?.map((item, index) => (
                                    <img src={item[slideNumber].url} alt="" className="sliderImg" />
                                ))
                            }
                        </Box>
                        <ArrowForwardIcon
                            className="arrow"
                            onClick={() => handleMove("r")}
                        />

                    </Box>
                }
                <Box className='containerBox'>

                    <Box className='hotewrapper'>
                        <Box className='location'>
                            <LocationOnIcon className='icon' />
                            <Typography className='text'>{hotellist.property.address}</Typography>
                        </Box>
                        <Box className='nearby'>
                            <Typography>{`Excellent location – Around ${hotellist.property.city}`}</Typography>
                            <Typography>{`Book a stay over ₹ ${hotellist.price} at this property`}</Typography>
                        </Box>
                        <Box className='hotelimages'>
                            {
                                hotellist?.images[0]?.map((item, index) => (
                                    <Box className='imgwrap' key={index}>
                                        <img
                                            src={item.url}
                                            onClick={() => handleOpen(index)}
                                            alt=''
                                            className='img'
                                        />
                                    </Box>
                                ))
                            }
                        </Box>
                        <Box className='hotelDetails'>
                            <Box className='hotelDetailsTexts'>
                                <Typography variant='h5' component='h1' sx={{ marginBottom: 5 }}>{`Stay in ${hotellist.property.property_name}`}</Typography>
                                <Typography>{hotellist.property.property_details}</Typography>
                            </Box>
                            <Box className='hotelDetailsPrice'>
                                <Typography className='heading'>Property highlights</Typography>
                                <Typography className='head2'>Perfect for night stay!</Typography>
                                <Box className='location'>
                                    <LocationOnIcon />
                                    <Typography className='address'>{hotellist.property.address}</Typography>
                                </Box>
                                <Typography className='headrooms'>Rooms With:</Typography>
                                <Box className='rooms'>
                                    <Box className='items'>
                                        <BedroomParentOutlinedIcon className='content' />
                                        <Typography className='content'>{hotellist.room_name}</Typography>
                                    </Box>
                                    <Box className='items'>
                                        <PreviewIcon className='content' />
                                        <Typography className='content'>{hotellist.view}</Typography>
                                    </Box>
                                </Box>
                                <Typography className='head2'>Allowed Persons{hotellist.roomNumber}</Typography>
                                <Box className='location'>
                                    <PeopleAltIcon />
                                    <Typography className='address'>{`allowed ${hotellist.guest}`}</Typography>
                                </Box>
                                <Typography className='head2'>Price:</Typography>
                                <Box className='location'>
                                    <CurrencyRupeeIcon />
                                    <Typography>{hotellist.price * options.room * days}</Typography>
                                </Box>
                                {
                                    user.authData ? <Button variant='contained' onClick={() => { navigate(`/booking/${hotellist._id}`) }}>Reserve Now</Button> : <Button variant='contained' onClick={showToastMessage}>Reserve Now</Button>
                                }
                                <ToastContainer hideProgressBar={true} toastStyle={{ backgroundColor: "black" }} />

                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default HotelSingle