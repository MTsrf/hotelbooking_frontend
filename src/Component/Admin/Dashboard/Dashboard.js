import { Badge, Box, CssBaseline, Divider, IconButton, List, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React, { useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Route, Routes } from 'react-router-dom';
import { mainListItems } from './ListItem/LIstItem';
import CategoryPage from '../../../Pages/Admin/CategoryPage';
import { useDispatch } from 'react-redux'
import Vendor from '../VendorDetails/Vendor'
import { ADMIN_LOGOUT } from '../../../redux/types';
import AllBooking from '../../../Pages/Admin/AllBooking';
import AllUsers from '../../../Pages/Admin/AllUsers';
import AllHotel from '../../../Pages/Admin/AllHotel';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);



const mdTheme = createTheme();
const Dashboard = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch({ type: ADMIN_LOGOUT });
    }

    const [open, setOpen] = useState(true)
    const toggleDrawer = () => {
        setOpen(!open)
    }
    return (
        <React.Fragment>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open} style={{ backgroundColor: '#eceff1', color: "#1565c0" }}>
                        <Toolbar sx={{ pr: '24px' }}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Dashboard
                            </Typography>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    onClick={handleLogout}
                                    sx={{ flexGrow: 1 }}

                                >
                                    Logout
                                </Typography>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar >
                        <Divider />
                        <List component="nav" >
                            {mainListItems}
                            <Divider sx={{ my: 1 }} />
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Routes>

                            <Route path='/category' element={<CategoryPage />} />
                            <Route exact path='/provider' element={<Vendor />} />
                            <Route path='/all-booking' element={<AllBooking />} />
                            <Route path='/users' element={<AllUsers />} />
                            <Route path='/hotel' element={<AllHotel />} />
                        </Routes>
                    </Box>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    )
}

export default Dashboard
