import { Avatar, Box, Grid, Typography } from "@mui/material"
import './Profile.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import EditUser from "./EditModel";

const Profile = () => {
    const onLogout = () => {
        console.log("ho");
    }
    return (
        <>
            <Box className='containerBox'>
                <Grid container spacing={2} className="profile-main">
                    <Grid item md={3} sm={12} xs={12}>
                        <Box className="avatar-side">
                            <Box className="profile-photo">
                                <Avatar sx={{ height: '100px', width: '100px' }} />
                            </Box>
                            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>Sharafudheen.M</Typography>
                            <Box className="logout" onClick={onLogout}>
                                <LogoutIcon sx={{ fontWeight: 'bold', fontSize: '30px' }} />
                                <Typography sx={{ fontSize: '20px', color: "#9e9e9e" }}>Logout</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={9} sm={12} xs={12} sx={{ display: 'flex', flexDirection: "column", gap: '10px' }}>
                        <Box className="details">
                            <Box className="title">
                                <Box>
                                    <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>Profile</Typography>
                                    <Typography>Basic info, for a faster booking experience</Typography>
                                </Box>
                                <Box>
                                    <EditUser/>
                                </Box>
                            </Box>
                            <Box className="name">
                                <Typography sx={{ fontSize: '15px', color: '#9e9e9e', textTransform: 'uppercase' }}>Name</Typography>
                                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>exmaple</Typography>
                            </Box>
                            <Box className="gender">
                                <Typography sx={{ fontSize: '15px', color: '#9e9e9e', textTransform: 'uppercase' }}>GENDER</Typography>
                                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>exmaple</Typography>
                            </Box>
                            <Box className="place">
                                <Typography sx={{ fontSize: '15px', color: '#9e9e9e', textTransform: 'uppercase' }}>Place</Typography>
                                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>exmaple</Typography>
                            </Box>
                        </Box>
                        <Box className="details">
                            <Box>
                                <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>Login Details</Typography>
                                <Typography>Manage your email address mobile number and password</Typography>
                            </Box>
                            <Box className="email">
                                <Typography sx={{ fontSize: '15px', color: '#9e9e9e', textTransform: 'uppercase' }}>Email</Typography>
                                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>exmaple</Typography>
                            </Box>
                            <Box className="phone">
                                <Typography sx={{ fontSize: '15px', color: '#9e9e9e', textTransform: 'uppercase' }}>PhoneNumber</Typography>
                                <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>exmaple</Typography>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default Profile