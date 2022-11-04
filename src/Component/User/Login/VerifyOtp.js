import { Alert, Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../helper/axiosInstance';
import { USER_VERIFY } from '../../../redux/types';
import { Btn } from '../syledcomponent/StyledComponent';

const VerifyOtp = ({setOpenForm,setOpenVerify}) => {
    const { dumb } = useSelector((dumb)=>({...dumb}))
    console.log(dumb);
    const dispatch = useDispatch()
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(false)
    const [verifyError, setVerifyError] = useState("")
    const [message,setMessage] = useState("")
    function handleChange(otp) {
        setError(false)
        setVerifyError("")
        setOtp(otp);
        console.log(otp);
    }

    const otpSubmit = async () => {
        try {
            if (otp === "") {
                setError(true)
            } else if(otp.length !== 6) {
                setError(true)
            }else{
                const { data:{success,phone,message} } = await axiosInstance.post("/otpVerify", { otp: otp,hash:dumb })
                setVerifyError("")
                setMessage(message)
                setTimeout(()=>{
                    dispatch({type:USER_VERIFY,payload:phone})
                    localStorage.setItem("dumb",JSON.stringify(phone))
                    setOpenVerify(false)
                    setOpenForm(success)
                },1000)
            }
        } catch (error) {
            setVerifyError(error.response.data.message)
        }
    }
    return (
        <>
            <Box className='verificationForm'>
                <Box>
                    <Typography component="h1" variant="h5">
                        Verify Account
                    </Typography>
                </Box>
                {
                    verifyError && <Alert severity='error'>{verifyError}</Alert>
                }
                {
                    message && <Alert severity='success'>{message}</Alert>
                }
                <Box className='secondBox'>
                    <Box className='thirdBox'>
                        <Box className="otp">
                            <OTPInput
                                onChange={handleChange}
                                value={otp}
                                className="hi"
                                inputStyle={error ? "errorStyle" : "inputStyle"}
                                numInputs={6}
                                isInputNum={true}
                                separator={<span>-</span>}
                            />
                        </Box>
                        <Box>
                            {
                                error && <Typography className='error'>Enter your Code here</Typography>
                            }
                        </Box>
                    </Box>

                    <Box>
                        <Btn className='btn' onClick={() => otpSubmit()}>Verify</Btn>
                    </Box>
                </Box>
                {/* <Grid container>
                    <Grid item xs>
                        <Typography>
                            Click Here?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid> */}
            </Box>

        </>
    )
}

export default VerifyOtp
