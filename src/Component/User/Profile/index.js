import { Avatar, Box, Grid } from "@mui/material"
import './Profile.scss'

const Profile = () =>{
    return (
        <>
        <Box className='containerBox'>
            <Grid container spacing={2} className="profile-main">
                <Grid item xs={4}>
                    <Box className="avatar-side">
                        <Box>
                            <Avatar></Avatar>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    sdkljfskld
                </Grid>

            </Grid>
        </Box>
        </>
    )
}

export default Profile