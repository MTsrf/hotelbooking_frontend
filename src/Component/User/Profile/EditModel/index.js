import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import './EditUser.scss'
import { Button, Input, Select } from '../../../syledcomponent/StyledComponent'

const EditUser = () => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const gender=["MALE","FEMALE"]
    return (
        <>
            <Box onClick={handleClickOpen} className="buttonEdit">
                <EditIcon sx={{ color: "#2196f3" }} />
                <Typography sx={{ color: "#2196f3", fontSize: '20px', fontWeight: 'bold' }}>Edit</Typography>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Profile</DialogTitle>
                <DialogContent className='content'>
                    <Box className="first">
                        <Typography>Name</Typography>
                        <Input 
                        margin={'10px 0px'}
                        border={'1px solid #063970'}
                        width={'440px'}
                        />
                    </Box>
                    <Box className="second">
                        <Box>
                            <Typography>Gender</Typography>
                           <Select
                           borderRadius={'3px'}
                           height={'43px'}
                           width={'220px'}
                           border={'1px solid #063970'}
                           >
                            <option>Choose gender</option>
                            {
                                gender?.map((item)=>(
                                    <option key={item}>{item}</option>
                                ))
                            }
                           </Select>
                        </Box>
                        <Box>
                            <Typography>Place</Typography>
                            <Input 
                            margin={'10px 0px'}
                            border={'1px solid #063970'}
                            width={'200px'}/>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                    backgroundColor={'white'}
                    clr={'black'}
                    >Cancel</Button>
                    <Button>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditUser