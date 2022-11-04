import { AppBar, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { Fragment } from 'react'

const NavBarVendor = () => {
    return (
        <Fragment>
            <AppBar sx={{ backgroundColor: '#063970' }}>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <Typography>
                            AnyServe
                        </Typography>
                    </Toolbar>
                </Container>

            </AppBar>
        </Fragment>
    )
}

export default NavBarVendor
