import { Alert, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Form, Formik, ErrorMessage, } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { USER_VERIFY } from '../../../redux/types'
import axiosInstance from '../../../helper/axiosInstance'

const otpInfo = {
    phone_number: ""
}

const OtpForm = ({setOpenVerify}) => {
    const dispatch = useDispatch()
    const [phone, setPhone] = useState(otpInfo)
    const { phone_number } = phone
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const otpValidation = Yup.object({
        phone_number: Yup.string()
            .required("Phone number  required")
            .matches(phoneRegExp, 'Enter a valid phone number')
            .min(10, "Enter 10 phone number")
            .max(10, "Enter 10 phone number"),
    })

    const handlePhoneChange = (e) => {
        setError("")
        const { name, value } = e.target
        setPhone({ ...phone, [name]: value })
    }
    const otpSubmit = async () => {
        try {
            const { data: { success, message, hash } } = await axiosInstance.post('/sendOtp', phone)
            setError("")
            setMessage(message)
            setTimeout(() => {
                dispatch({ type: USER_VERIFY, payload: hash })
                localStorage.setItem("dumb", JSON.stringify(hash))
                setOpenVerify(success)
            }, 2000)
        } catch (error) {
            setMessage("")
            setError(error.response.data.message)
        }
    }
    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                Signup 
            </Typography>
            {
                message && <Alert severity='success'>{message}</Alert>
            }
            {
                error && <Alert severity='error'>{error}</Alert>
            }

            <Box>
                <Formik
                    enableReinitialize
                    initialValues={{
                        phone_number
                    }}
                    validationSchema={otpValidation}
                    onSubmit={
                        () => { otpSubmit() }
                    }
                >
                    {
                        (formik) => (
                            <Form>
                                <TextField
                                    margin='normal'
                                    fullWidth
                                    name='phone_number'
                                    label="Phone Number"
                                    id='phone_number'
                                    type="tel"
                                    size='small'
                                    onChange={handlePhoneChange}
                                    helperText={<ErrorMessage name='phone_number' />}
                                />

                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >Submit</Button>
                            </Form>
                        )
                    }
                </Formik>


            </Box>
        </React.Fragment>
    )
}

export default OtpForm
