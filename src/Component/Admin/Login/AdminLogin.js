import React, { useState } from 'react'
import { Alert, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Paper, Stack, TextField, Typography, } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './AdminLogin.css'
import PersonIcon from '@mui/icons-material/Person';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../../helper/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { ADMIN_LOGIN } from '../../../redux/types'

const adminLoginInfos ={
  name:"",
  password:""
}



const theme = createTheme()
const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [ error, setError ] = useState("")
  const [ loading,setLoading ] = useState(false)
  const [ login,setLogin ] = useState(adminLoginInfos)
  const { email,password } = login;
  const handlLoginChange =(e)=>{
    const {name,value}=e.target;
    setLogin({...login,[name]:value})
  }


  const loginValidation = Yup.object({
    email:Yup.string().required("Email address required").email("Enter a valid email address").max(100),
    password:Yup.string().required("Password is required").min(6,"Please enter a minimum 6 character")

  })


  const loginAdminSubmit = async()=>{
    try {
      const { data } = await axiosInstance.post("/adminLogin",login)
      console.log(data);
      setError("")
      setTimeout(()=>{
        dispatch({type:ADMIN_LOGIN,payload:data})
        localStorage.setItem("admin",JSON.stringify(data))
        navigate('/admin/dashboard')
      })
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
      
    }
  }



  return (
    <React.Fragment>
      <Box className='AdminLogin'>
        <Container maxWidth="md">
          <Paper elevation={3} component={Stack} direction="column" justifyContent="center" className='admin_login_paper'>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className='box_admin_login' sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Formik
                  enableReinitialize
                  initialValues={{
                    email,
                    password,
                  }}
                  validationSchema={loginValidation}
                  onSubmit={
                    ()=>{loginAdminSubmit()}
                  }
                  >
                    {
                      (formik) => (
                        <Form component="form" noValidate sx={{ mt: 1 }}>
                          <Field as={TextField}
                            margin='normal'
                            fullWidth
                            id='email'
                            label="Email Address"
                            name='email'
                            onChange={handlLoginChange}
                            helperText ={<ErrorMessage name="email"/>}
                          />
                          <Field as={TextField}
                            margin='normal'
                            fullWidth
                            id='password'
                            label="Password"
                            type="password"
                            name='password'
                            onChange={handlLoginChange}
                            helperText={<ErrorMessage name="password"/>}
                          />
                          <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                          />
                          {
                            error && <Alert severity="error">{error}</Alert>
                          }
                          <Button
                            type="submit"
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}>
                            login
                          </Button>
                          
                        </Form>
                      )
                    }
                  </Formik>
                </Box>
              </Container>
            </ThemeProvider>
          </Paper>
        </Container>
      </Box>
    </React.Fragment>
  )
}

export default AdminLogin
