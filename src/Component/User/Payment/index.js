import { Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import ProductView from "../Booking/ProductView"
import SideBar from "../Booking/SideBar"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from "react"
import axiosInstance from "../../../helper/axiosInstance"
import moment from 'moment'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CircularProgress from '@mui/material/CircularProgress';


function loadScript(src) {
    return new Promise((resolve) => {
        console.log(src);
        const script = document.createElement('script')
        script.src = src;
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })

}

const Payment = () => {
    const { rooms, checkout } = useParams()
    const navigate = useNavigate()
    const [pay, setPay] = useState("")
    const [error, setError] = useState("")
    const [response, setResponse] = useState("")
    const [ validate,setValidate ] = useState(false)
    const { search, destination, dates, options } = useSelector(state => state.search)
    const user = useSelector(state => state.user)
    const product = search?.filter((item) => {
        return item._id === rooms
    })

  

    const start = moment(dates[0].startDate).format("ddd,ll")
    const end = moment(dates[0].endDate).format("ddd,ll")
    const days = moment(dates[0].endDate).diff(moment(dates[0].startDate), 'days')

    async function displayRazorpay() {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        console.log(res);
        if (!res) {
            alert('Razorpay SDK failed to load')
            return
        }

        const { data: { key_id, amount, currency, id } } = await axiosInstance.post('/payment', { price: product[0].price }, {
            headers: {
                Authorization: `Bearer ${user.authData.token}`,
                "content-type": "multipart/form-data",
            }
        })
        var options = {
            "key": key_id, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": currency,
            "name": "Hotella",
            "image": "http://localhost:5000/logo.svg",
            "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response) {
                try {
                    const { data: { success } } = await axiosInstance.post("/complete", {
                        checkout,
                        rooms,
                        pay,
                        order: id,
                        amount: product[0].price,
                        razorpayment_id: response.razorpay_payment_id,
                    }, {
                        headers: {
                            Authorization: `Bearer ${user.authData.token}`,
                            Signature: response.razorpay_signature,
                            "content-type": "multipart/form-data",
                        }
                    })
                    setResponse(response.razorpay_payment_id)
                    if(success){
                        setTimeout(()=>{
                            setResponse("")
                            navigate("/my-book")
                        },4000)
                    }
                } catch (error) {
                    console.log("errro");
                    console.log(error);
                    setError(error.message)
                }
            },
            "prefill": {
                "name": user.authData.name,
                "email": user.email,
                "contact": user.phone
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()

    }
    const onSubmit = async () => {
        if (pay === "") {
            return setValidate(true)
        }
        if (pay === "ONLINE") {
            displayRazorpay()
        } else {
            try {
                let { data:{success,receipt} } = await axiosInstance.post("/complete", { checkout, rooms, pay }, {
                    headers: {
                        Authorization: `Bearer ${user.authData.token}`,
                        "content-type": "multipart/form-data",
                    }
                })
                setResponse(receipt)
                setTimeout(()=>{
                    setResponse("")
                    navigate("/my-book")
                },4000)
            } catch (error) {
                setError(error.message)
            }
        }
    }
    console.log(pay);
    return (
        <>
            <Box className='containerBox'>
                <Box className='bookingWrap'>

                    { response ? null: <Box className='side'>
                        <SideBar start={start}
                         product={product}
                         end={end}
                         days={days}
                         options={options} 
                         user={user} 
                         type="list" 
                         setPay={setPay} 
                         displayRazorpay={displayRazorpay}
                         validate={validate}
                         setValidate={setValidate} />
                    </Box>}
                    {
                        response ? <Box className="success">
                            <Box className="snip">
                                <CircularProgress />
                            </Box>
                            <Box className="text">
                                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: '#4caf50' }}>Booking Successfully Completed</Typography>
                                <Box>
                                    <Typography>{`Your receipt Id:${response}`}</Typography>
                                </Box>
                            </Box>
                        </Box> : <Box className="center">
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
                            <Box className="payBtn" type="submit" onClick={() => { onSubmit() }}>
                                <LockOutlinedIcon />
                                <Box type="submit">Complete Payment</Box>
                            </Box>

                        </Box>
                    }
                      
                </Box>
            </Box>
        </>
    )
}

export default Payment