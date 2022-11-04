import React, { useState } from 'react'
import OtpForm from './OtpForm'
import VerifyOtp from './VerifyOtp'
import { useSelector } from 'react-redux'
import AddressForm from './AddressForm'
const RegisterForm = ({handleClose}) => {
    const [ openForm,setOpenForm ] = useState(false)
    const [ openVerify,setOpenVerify ] = useState(false)
  return (
    <>
      {
        openForm ? <AddressForm handleClose={handleClose} setOpenForm ={setOpenForm }/> : openVerify ? <VerifyOtp setOpenForm={setOpenForm} setOpenVerify={setOpenVerify} />: <OtpForm setOpenVerify={setOpenVerify}/>
      }
    </>
  )
}

export default RegisterForm
