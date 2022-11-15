import { Box, Button, Grid, Typography } from "@mui/material"
import { useState } from "react"
import './Booking.scss'
import ProductView from "./ProductView"
import SideBar from "./SideBar"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import Form from "./Form"
import AddressForm from "./AddressForm"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment'
import * as Yup from 'yup'
import axiosInstance from "../../../helper/axiosInstance"
import { BOOKED_DATA } from "../../../redux/types"


const Booking = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { search, destination, dates, options } = useSelector(state => state.search)
    const user = useSelector(state => state.user)
    const product = search?.filter((item) => {
        return item._id === id
    })
    console.log(product[0]._id);
    const start = moment(dates[0].startDate).format("ddd,ll")
    const end = moment(dates[0].endDate).format("ddd,ll")
    const days = moment(dates[0].endDate).diff(moment(dates[0].startDate), 'days');

    const [phone, setPhone] = useState("")
    const [guest, setGuest] = useState(options.adult + options.children)
    const [guestname, setGuestName] = useState("")
    const [errorPhone, setErrorPhone] = useState("")
    const [errorgeust, setErrorGuest] = useState('')
    const [errguestname, setErrGuestName] = useState('')
    const [error, setError] = useState("")


    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    var reg = /^\d+$/;
    const addressFormValidation = Yup.object({
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
        guest: Yup.string().matches(reg, 'Enter only number').required('Guest is required'),
        guestname: Yup.string().required('Guest name is required')

    })

    console.log(phone);
    const addressSubmit = async () => {

        if (phone == "") {
            setErrorPhone("phone number is required")
            setErrGuestName("")
            setErrorGuest("")
            return
        } else if (guest == "") {
            setErrorGuest("Enter Guest Number")
            setErrorPhone("")
            setErrGuestName("")
            return
        } else if (guestname == "") {
            setErrGuestName("Enter guest name")
            setErrorPhone("")
            setErrorGuest("")
            return
        } else if (phone.length != 12) {
            setErrorPhone("Please enter 10 Number")
            setErrGuestName("")
            setErrorGuest("")
            return
        }

        setErrorPhone("")
        setErrorGuest("")
        setErrGuestName("")
        try {
            const { data: { success, response } } = await axiosInstance.post('/booking', {
                start: dates[0].startDate,
                end: dates[0].endDate,
                room: options.room,
                person: guest,
                hotel: product[0]._id,
                phone_number: phone,
                name: guestname
            },
                {
                    headers: {
                        Authorization: `Bearer ${user.authData.token}`,
                        "content-type": "multipart/form-data",
                    }
                })
            console.log(response);
            dispatch({ type: BOOKED_DATA, payload: response })
            localStorage.setItem("booked", JSON.stringify(response))
            if (success) {
                navigate(`/payment/${response.room}/${response._id}`)
            }

        } catch (error) {
            console.log(error);
            setError(error.message)
        }

    }
    return (
        <>
            <Box className="containerBox">
                <Grid container spacing={2} className="bookingWrap">
                    <Box className="side">
                        <SideBar start={start} product={product} end={end} days={days} options={options} user={user} />
                    </Box>
                    <Box className="center">
                        <ProductView product={product} />
                        <Box className="cancel">
                            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '18px' }}>Good to know:</Typography>
                            <Box className="free">
                                <CheckCircleOutlineIcon sx={{ color: '#4caf50' }} />
                                <Box className="first">
                                    <Typography sx={{ fontSize: '18px' }}>{`Free cancellation until 9 AM on ${start}`}</Typography>
                                    <HelpOutlineIcon sx={{ color: '#03a9f4' }} />
                                </Box>
                            </Box>
                            <Box className="payment">
                                <CheckCircleOutlineIcon sx={{ color: '#4caf50' }} />
                                <Typography sx={{ fontSize: '18px' }}>No payment needed today. You'll pay when you stay.</Typography>
                            </Box>
                        </Box>
                        <Form user={user} />
                        <AddressForm
                            options={options}
                            phone={phone}
                            setPhone={setPhone}
                            guest={guest}
                            setGuest={setGuest}
                            guestname={guestname}
                            setGuestName={setGuestName}
                            addressSubmit={addressSubmit}
                            errorPhone={errorPhone}
                            errorgeust={errorgeust}
                            errguestname={errguestname}
                        />

                        <Box className="submitBtn" type="submit" onClick={() => { addressSubmit() }}>
                            <LockOutlinedIcon />
                            <Box type="submit">Complete booking</Box>
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export default Booking