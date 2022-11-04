import React, { Fragment, useEffect, useRef, useState } from 'react'
import { AppBar, Toolbar, Typography, Container, Tabs, Tab, Box, Button, Avatar } from '@mui/material'
import './NavBar.scss'
import LoginDailog from '../Login/LoginDailog';
import { useDispatch, useSelector } from 'react-redux';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Notifications from './List/Notifications';
import { USER_LOGOUT } from '../../../redux/types';
import ScrollToColor01 from './Scroll';
import { useNavigate } from 'react-router-dom';
import useClickOutside from '../../../helper/clickOutside';

const NavBar = ({ type }) => {
    const navigate = useNavigate()
    const Menu = useRef(null)
    const { user } = useSelector((user) => ({ ...user }))

    let userName = ""
    let firstChar = ""
    const [users, setUsers] = useState("")
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (user.authData) {
            userName = user.authData.name
            firstChar = userName.charAt(0).toUpperCase();
            setUsers(firstChar)
            setName(user.authData.name)
        } else {
            setUsers("")
            setName("")
        }
    }, [user.authData])
    const onLogout = () => {
        dispatch({ type: USER_LOGOUT })
        setOpen(false)
    }
    useClickOutside(Menu, () => {
        setOpen(false)
    })

    return (
        <Fragment>
            <Box className='navbarBox'>
                {
                    type === "list" ? (
                        <AppBar >
                            <Box className='navbarContainer'>
                                <Toolbar>
                                    <Box>
                                        <Typography onClick={() => { navigate("/") }}>
                                            AnyServe
                                        </Typography>

                                    </Box>
                                    <Box sx={{ marginLeft: 'auto' }} className='thirdBox'>
                                        <Box className='fourBox'>
                                            {
                                                users ? <Box className='userInfo' onClick={() => setOpen(!open)}>
                                                    <Box>
                                                        <Avatar className='avatar' sx={{ bgcolor: deepOrange[500] }}>{users}</Avatar>
                                                    </Box>
                                                    <Box className='name'>
                                                        {`Hi ${name}`}
                                                    </Box>
                                                </Box> : <LoginDailog />
                                            }
                                        </Box>

                                    </Box>
                                </Toolbar>
                            </Box>
                        </AppBar>
                    ) : <ScrollToColor01>

                        <AppBar >
                            <Box className='navbarContainer'>
                                <Toolbar>
                                    <Box>
                                        <Typography onClick={() => { navigate("/") }}>
                                            AnyServe
                                        </Typography>
                                    </Box>
                                    <Box sx={{ marginLeft: 'auto' }} className='thirdBox'>
                                        <Box className='fourBox'>
                                            {
                                                users ? <Box className='userInfo' onClick={() => setOpen(!open)}>
                                                    <Box>
                                                        <Avatar className='avatar' sx={{ bgcolor: deepOrange[500] }}>{users}</Avatar>
                                                    </Box>
                                                    <Box className='name'>
                                                        {`Hi ${name}`}
                                                    </Box>
                                                </Box> : <LoginDailog />
                                            }
                                        </Box>

                                    </Box>
                                </Toolbar>
                            </Box>
                        </AppBar>
                    </ScrollToColor01>
                }
                <Box ref={Menu}>
                    {open &&
                        <Box>
                            <Notifications onLogout={onLogout} />
                        </Box>
                    }
                </Box>
            </Box>
        </Fragment>
    )
}

export default NavBar
