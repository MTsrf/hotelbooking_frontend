import React, { useState } from 'react'
import { Alert, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material'
import { Form, Formik,Field, ErrorMessage, getIn } from 'formik'
import * as Yup from 'yup'
import axiosInstance from '../../../helper/axiosInstance'
import { useDispatch } from 'react-redux'
import { USER_LOGIN } from '../../../redux/types'

const userLoginInfos ={
    username:"",
    password:""
}
const LoginFormUser = ({handleClose}) => {
    const dispatch = useDispatch()
    const [login,setLogin] = useState(userLoginInfos)
    const { username, password } = login
    const [ error,setError ] = useState("")
    const [ message,setMessage ] = useState("")
    const handleLoginChange = (e)=>{
        const {name,value} = e.target
        setLogin({...login,[name]:value})
    }

    const loginValidation = Yup.object({
        username:Yup.string().required("Email or Phone Number required"),
        password:Yup.string().required("Password is required").min(6,"Please enter a minimum 6 character")
    })

    const loginSubmit =async ()=>{
        try {
            const { data:{success,profile,message} } = await axiosInstance.post('/loginUser',login)
           setError("")
           setMessage(message)
           setTimeout(()=>{
            dispatch({type:USER_LOGIN,payload:profile})
            localStorage.setItem("user",JSON.stringify(profile))
            handleClose()
           },1000)
        } catch (error) {
            setMessage("")
            setError(error.response.data.message)
        }
    }
    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            {
                error && <Alert severity='error'>{error}</Alert>
            }
            {
                message && <Alert severity='success'>{message}</Alert>
            }
            <Formik
            enableReinitialize
            initialValues={{
                username,
                password,
            }}
            validationSchema={loginValidation}
            onSubmit={
                ()=>{loginSubmit()}
            }
            >
                {
                    ({errors,touched}) => (
                        <Form>
                            <Field as={TextField}
                                margin='normal'
                                fullWidth
                                name='username'
                                label="Email and Phone"
                                id='username'
                                type="username"
                                size='small'
                                onChange={handleLoginChange}
                                helperText={<ErrorMessage name="username"/>}
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
                                onChange={handleLoginChange}
                                helperText={<ErrorMessage name='password'/>}
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
                            >Sign In</Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
            </Formik>
        </React.Fragment>
    )
}

export default LoginFormUser
