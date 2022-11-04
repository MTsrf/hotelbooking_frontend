import { Alert, Box, Button, Checkbox, Typography } from '@mui/material'
import axiosInstance from '../../../../helper/axiosInstance'
import { RadioButton } from '../../syledcomponent/StyledComponent'
import './SideBar.scss'


const SideBar = ({ start, product, end, days, options,user,type, setPay, validate, setValidate }) => {
    const handleChange = (e) =>{
        setPay(e.target.value)
        setValidate(false)
    }
    
    return (
        <>
            <Box className='sidebar'>
                <Box className="istitle">
                    <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Your Booking Details</Typography>
                </Box>
                <Box className='check'>
                    <Box className='in'>
                        <Typography sx={{ fontSize: '14px' }}>Check-in</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{start}</Typography>
                        <Typography>{product[0].checkin_time}</Typography>
                    </Box>
                    <Box className='out'>
                        <Typography sx={{ fontSize: '14px' }}>
                            Check-out
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{end}</Typography>
                        <Typography>{product[0].checkout_time}</Typography>
                    </Box>
                </Box>
                <Box className='days'>
                    <Typography>Total Days of stay:</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{`${days}   days`}</Typography>
                </Box>
                <Box className='rooms'>
                    <Typography sx={{ fontWeight: 'bold' }}>Your Selected Rooms:</Typography>
                    <Typography>{product[0].room_name}</Typography>
                </Box>
            </Box>
            <Box className='pricebar'>
                <Box className='price'>
                    <Box>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Price</Typography>
                        <Typography sx={{ fontSize: '13px' }}>{`for ${days} & ${options.children + options.adult} guests`}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>₹ {product[0].price * days * options.room}</Typography>
                </Box>
                {/* <Box className='tax'>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>Excluded charges</Typography>
                    <Box className='amount'>
                        <Typography>Goods & services tax</Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>4000</Typography>
                    </Box>
                </Box> */}
            </Box>
            {
                validate && <Alert severity='error'>Please Check Payment</Alert>
            }
            { type=="list" && <Box className='pay'>
                <Box className='option'>
                    <Typography sx={{ fontWeight: 'bold' }}>Payment</Typography>
                </Box>
                <Box className='online'>
                    <Typography>Online Payment</Typography>
                    {/* <Payment /> */}
                    <RadioButton
                        type="radio"
                        name="payment"
                        margin={'10px'}
                        value="ONLINE"
                        onChange={handleChange}
                    />
                </Box>
                <Box className='off'>
                    <Typography>Pay to Hotel</Typography>
                    <RadioButton
                        type="radio"
                        name="payment"
                        margin={'10px'}
                        value="PAY TO HOTEL"
                        onChange={handleChange}
                    />
                </Box>
            </Box>}
        </>
    )
}

export default SideBar