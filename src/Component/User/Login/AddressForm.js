import { Alert, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import axiosInstance from '../../../helper/axiosInstance'
import { USER_CLEAR, USER_LOGIN } from '../../../redux/types'
// import {useAlert} from 'react-alert'

const signupInfo = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
}
const AddressForm = ({handleClose,setOpenForm}) => {
    const dispatch = useDispatch()
    const { dumb } = useSelector((dumb)=>({...dumb}))
    // const alert = useAlert()
    const [signup, setSignup] = useState(signupInfo)
    const { name, email, password, confirmpassword } = signup

    const [ error,setError ] = useState("")
    const [ message,setMessage ] = useState("")

    const handleAddressChange = (e) => {
        const { name, value } = e.target
        setSignup({ ...signup, [name]: value })
    }

    const SignupValidation = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email Address required").email("Please enter valid email address").max(100),
        password: Yup.string().required('Password is required').min(6,"Minimum 6 letter enter"),
        confirmpassword: Yup.string().required("Confirm Password required")
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    const signupSubmit = async()=>{
        try {
            const {data:{success,profile,message}} = await axiosInstance.post('/userSignup',{
                name:name,
                email:email,
                password:password,
                phone:dumb
            })
            setError("")
            setMessage(message)
            setTimeout(()=>{
                dispatch({type:USER_LOGIN,payload:profile})
                dispatch({type:USER_CLEAR})
                localStorage.setItem("user",JSON.stringify(profile))
                setOpenForm(false)
                handleClose()
            },1000)
        } catch (error) {
            setMessage("")
            setError(error.response.data.message)
        }
    }
    return (
        <>
            <Box className='addressBox'>

                <Box>
                    <Typography component="h1" variant="h5">
                        Signup
                    </Typography>
                    
                </Box>
                {
                    error && <Alert severity='error'>{error}</Alert>
                }
                <Box>
                    <Formik
                    enableReinitialize
                    initialValues={{
                        name,
                        email,
                        password,
                        confirmpassword
                    }}
                    validationSchema={SignupValidation}
                    onSubmit={
                        ()=>{signupSubmit()}
                    }
                    >
                        {
                            (formik) => (
                                <Form>
                                    <Field as={TextField}
                                        margin='normal'
                                        fullWidth
                                        name='name'
                                        label="Name"
                                        id='name'
                                        type="name"
                                        size='small'
                                        onChange={handleAddressChange}
                                        helperText={<ErrorMessage name="name" />}
                                        autoComplete="nope"
                                    />
                                    <Field as={TextField}
                                        margin='normal'
                                        fullWidth
                                        name='email'
                                        label="Email Address"
                                        id='email'
                                        type="email"
                                        size='small'
                                        onChange={handleAddressChange}
                                        helperText={<ErrorMessage name="email" />}
                                        autoComplete="nope"
                                    />
                                    <Field as={TextField}
                                        margin='normal'
                                        fullWidth
                                        name='password'
                                        label="Password"
                                        id='password'
                                        type="password"
                                        size='small'
                                        onChange={handleAddressChange}
                                        helperText={<ErrorMessage name='password' />}
                                    />
                                    <Field as={TextField}
                                        margin='normal'
                                        fullWidth
                                        name='confirmpassword'
                                        label="Confirm Password"
                                        id='confirmpassword'
                                        type="password"
                                        size='small'
                                        onChange={handleAddressChange}
                                        helperText={<ErrorMessage name='confirmpassword' />}
                                    />
                                    <Field as={FormControlLabel}
                                        control={<Field as={Checkbox} value="remember" color="primary" />}
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
            </Box>
            {/* {
                message && alert.success(message)
            } */}
        </>
    )
}

export default AddressForm
