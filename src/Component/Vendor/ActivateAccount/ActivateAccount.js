import { Alert, Box, Button, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import './activate.scss'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../helper/axiosInstance'
import { useDispatch } from 'react-redux'
import { VENDOR_CLEAR, VENDOR_LOGOUT } from '../../../redux/types'

const ActivateAccount = () => {
    const dispatch = useDispatch()
    const { token } = useParams()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()
    const activateSubmit = async () => {
        try {
            const { data } = await axiosInstance.post('/activateAccount', { token },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setError("")
            if (!data.success) {
                setError("Activation error ...")
            }
            setSuccess(data.message)
            setTimeout(() => {
                dispatch({ type:VENDOR_CLEAR })
                navigate('/vendor')
            },1500)
        } catch (error) {
            setError(error.response.data.message);
        }

    }
    return (
        <React.Fragment>
            <Container maxWidth='xl'>
                <Box className='activate-account'>
                    <Box className='logo'>
                        <Typography variant='h5'>AnyServe</Typography>

                    </Box>
                    {
                        error && <Alert severity='error'>{error}</Alert>
                    }
                    {
                        success && <Alert severity='success'>{success}</Alert>
                    }
                    <Box className='content'>
                        <Typography className='content-text'>You recently created an account on AnyServe . To complete your registration . please Activate your account</Typography>
                        <Button className='button' onClick={activateSubmit}>Activate Your Account</Button>
                        <Typography className='text'>
                            AnyServe, being the best hotel-booking site in the country, offers several discounts on budget hotels as well. If you are looking for the cheapest hotels with amazing deals on the website,
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default ActivateAccount
