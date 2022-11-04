import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import LoginFormUser from './LoginFormUser';
import './UserLogin.scss'
import { Grid } from '@mui/material';
import RegisterForm from './RegisterForm'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
const LoginDailog = () => {
    const [open, setOpen] = React.useState(false);
    const [visibel,setVisible] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleVisibleOpen = ()=>{
        setVisible(true)
    }
    const handleVisibleClose = () => {
        setVisible(false)
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Login or Signup
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className="dailog_user_login login_dialog"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": { 
                            width: "100%",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                            maxWidth: "400px",  // Set your width here
                        },
                    },
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Grid container
                        justifyContent="space-evenly"
                        sx={{
                            paddingTop:3
                        }}>
                        <Button variant='outlined' onClick={handleVisibleClose} sx={{
                            borderRadius:50,
                            paddingLeft:7,
                            paddingRight:7,
                            boxShadow:3
                        }}>Login</Button>
                        
                        <Button variant='outlined' onClick={handleVisibleOpen} sx={{
                            borderRadius:50,
                            paddingLeft:7,
                            paddingRight:7,
                            boxShadow:3
                        }}>Signup</Button>
                    </Grid>
                </BootstrapDialogTitle>
                <DialogContent dividers className='dialogBox'>
                    {
                        !visibel?<LoginFormUser handleClose={handleClose}/>:<RegisterForm handleClose={handleClose}/>
                    }
                    
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
            </BootstrapDialog>
        </React.Fragment>
    )
}

export default LoginDailog
