import { Alert, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../helper/axiosInstance'
import { VENDOR_ACTIVE, VENDOR_LOGIN } from '../../../redux/types'
const registerInfos = {
  full_name: "",
  email: "",
  phone_number: "",
  password: "",
}
const SignupFormVendor = ({ handleVisibleClose,setVisible }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [signup, setSignup] = useState(registerInfos)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const [success, setSuccess] = useState(false)
  const { full_name, email, phone_number, password } = signup
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value })
  }


  //signup form validation
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const signupValidation = Yup.object({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().required("Email is required").email("Enter a valid email address")
      .max(100),
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, "Phone number to short")
      .max(10, "Phone number to long"),
    password: Yup.string().required("Password is required").min(6, "Please enter minimum 6 character")
  })

  const signupSubmit = async () => {
    try {
      const { data } = await axiosInstance.post("/vendorSignup", signup)
      setError("")
      setSuccess(data.message)
      const { message , ...rest } = data;
      setTimeout(()=>{
        dispatch({type:VENDOR_ACTIVE,payload:rest})
        localStorage.setItem("temp", JSON.stringify(rest))
        setVisible(false)
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
        Create an Account
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          full_name,
          email,
          phone_number,
          password
        }}
        validationSchema={signupValidation}
        onSubmit={
          () => signupSubmit()
        }
      >
        {
          (formik) => (
            <Form>
              <Field as={TextField}
                margin='normal'
                fullWidth
                name='full_name'
                label="Full Name"
                id='full_name'
                type="text"
                size='small'
                onChange={handleSignupChange}
                helperText={<ErrorMessage name="full_name" />}
              />
              <Field as={TextField}
                margin='normal'
                fullWidth
                name='email'
                label="Email Address"
                id='email'
                type="email"
                size='small'
                onChange={handleSignupChange}
                error={!!ErrorMessage?.email}
                helperText={<ErrorMessage name="email" />}

              />
              <Field as={TextField}
                margin='normal'
                fullWidth
                name='phone_number'
                label="Phone Number"
                id="phone_number"
                type="tel"
                size='small'
                onChange={handleSignupChange}
                helperText={<ErrorMessage name='phone_number' />}
              />
              <Field as={TextField}
                margin='normal'
                fullWidth
                name='password'
                label="Password"
                id='password'
                type="password"
                size='small'
                onChange={handleSignupChange}
                helperText={<ErrorMessage name="password" />}
              />
              <Field as={FormControlLabel}
                control={<Field as={Checkbox} value="remember" color="primary" />}
                label="Remember me"
              />
              {
                error && <Alert severity="error">{error}</Alert>
              }
              {
                success && <Alert severity="success">{success}</Alert>
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
                  <Link href="#" onClick={handleVisibleClose} variant="body2">
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

export default SignupFormVendor
