import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { Input } from '../../../syledcomponent/StyledComponent'
import './Form.scss'


const Form = ({user}) => {
    const [name,setName] = useState(user.authData.name)
    const [email,setEmail] = useState(user.authData.email)
    return (
        <>
            <Box className='formAddress'>
                <Typography sx={{ fontWeight:'bold',fontSize:'20px'}}>
                    Enter your details
                </Typography>
                <Box className='first'>
                    {/* <FormControl>
                        <Typography sx={{fontWeight:'bold'}}>Are you travelling for work?</Typography>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl> */}
                    <Box className='name'>
                        <Box>
                            <Typography sx={{fontWeight:'bold',fontSize:'15px'}}>First name</Typography>
                            <Input className="input" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </Box>
                        {/* <Box>
                            <Typography sx={{fontWeight:'bold',fontSize:'15px'}}>Last name</Typography>
                            <Input className="input"/>
                        </Box> */}
                    </Box>
                    <Box className='email'>
                        <Box>
                            <Typography sx={{fontWeight:'bold',fontSize:'15px'}}>Email address</Typography>
                            <Input className="input" name="email" value={email}/>
                            <Typography sx={{ fontSize:'14px',color:'#bdbdbd'}}>Confirmation email goes to this address</Typography>

                        </Box>
                        <Box>
                            <Typography sx={{fontWeight:'bold',fontSize:'15px'}}>Confirm email address</Typography>
                            <Input className="input"  name="confirm-email" value={email}/>
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{fontWeight:'bold',fontSize:'15px'}}>Who are you booking for?</Typography>
                        {/* <Box>
                            <FormControl>
                                
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    // value={value}
                                    // onChange={handleChange}
                                >
                                    <FormControlLabel value="original_person" control={<Radio />} sx={{ fontSize:'13px',color:'#757575'}} label="I am the main guest" />
                                    <FormControlLabel value="guest" control={<Radio />} sx={{ fontSize:'13px',color:'#757575'}} label="Booking is for someone else" />
                                </RadioGroup>
                            </FormControl>
                        </Box> */}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Form