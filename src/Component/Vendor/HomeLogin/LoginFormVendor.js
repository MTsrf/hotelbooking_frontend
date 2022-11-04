import { Alert, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Form, Formik, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../../helper/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { VENDOR_LOGIN } from '../../../redux/types'

const loginInfos = {
    email: "",
    password: "",
}
const LoginFormVendor = ({ handleVisibleOpen }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ error,setError ] = useState("")
    const [ loading,setLoading ] = useState(false)
    const [ success,setSuccess ] = useState("")
    const [login,setLogin] = useState(loginInfos);
    const { email, password } = login;
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setLogin({...login,[name]:value})
    }

    const loginValidation = Yup.object({
        email: Yup.string()
          .required("Email address is required.")
          .email("Must be a valid email.")
          .max(100),
        password: Yup.string().required("Password is required").min(6,"please entered minimum 6 character"),
      });



    const loginSubmit = async()=>{
        try {
            const { data } = await axiosInstance.post('/loginVendor',login)
            setError("")
            console.log(data);
            setSuccess(data.message)
            const {message, ...rest} = data
            setTimeout(()=>{
                dispatch({type:VENDOR_LOGIN,payload:rest})
                localStorage.setItem("vendor",JSON.stringify(rest))
                navigate('/vendor/home')
            },2000)

        } catch (error) {
            setLoading(false)
            setSuccess("")
            setError(error.response.data.message)
            
        }
    }
    return (
        <React.Fragment>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik 
            enableReinitialize
            initialValues={{
                email,
                password
            }}
            validationSchema={loginValidation}
            onSubmit={()=>{
                loginSubmit();
            }}
            >
                {
                    (formik) => (
                        <Form>
                            <Field as={TextField}
                                margin='normal'
                                fullWidth
                                name='email'
                                label="Email Address"
                                id='email'
                                type="email"
                                size='small'
                                onChange={handleChange}
                                error={!!ErrorMessage?.email}
                                helperText={<ErrorMessage name="email" />}
                            />
                                   
                            <Field as={TextField}
                                margin='normal'
                                fullWidth
                                name='password'
                                label="Password"
                                id='password'
                                type="password"
                                size='small'
                                onChange={handleChange}
                                helperText={<ErrorMessage name="password" />}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            {
                                error && <Alert severity="error">{error}</Alert>
                            }
                            {
                                success && <Alert severity='success'>{success}</Alert>
                            }
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
                                    <Link href="#" onClick={handleVisibleOpen} variant="body2">
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

export default LoginFormVendor
