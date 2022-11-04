import { Box, Paper, Typography } from "@mui/material";
import HotelIcon from '@mui/icons-material/Hotel';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import React, { useRef, useState } from "react";
import { Btn, Input, Button } from "../syledcomponent/StyledComponent";
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './bookingBar.scss'
import useClickOutside from "../../../helper/clickOutside";
const BookingBar = () => {
    const [open, setOpen] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })
    const handleOption = (name, operations) => {
        setOptions(prev => {
            return { ...prev, [name]: operations === "i" ? options[name] + 1 : options[name] - 1 }
        })
    }
    const closedate = useRef(null)
    useClickOutside(closedate,()=>{
        setOpen(false)
    })
    const roomselect = useRef(null)
    useClickOutside(roomselect, ()=>{
        setOpenOptions(false)
    })

    return (
        <>
            <Box className="bookingBar">
                <Box className="containerBox">
                    <Paper className='bookingFied' elevation={0}>
                        <Box className='headerSearch'>
                            <Box className="headerSearchItem">
                                <HotelIcon className='headerIcon' />
                                <Input
                                    type="text"
                                    placeholder="Search Place"
                                    className="headerSearchInput"
                                />
                            </Box>
                            <Box className="headerSearchItem">
                                <CalendarMonthIcon className='headerIcon' />
                                <span onClick={() => { setOpen(!open) }} className='headerSearchText'>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                                <Box ref={closedate}>
                                    {open && <DateRange
                                        editableDateInputs={true}
                                        onChange={item => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        months={2}
                                        direction="horizontal"
                                        className='date'
                                        ranges={date}
                                    />}
                                </Box>

                            </Box>
                            <Box className="headerSearchItem">
                                <GroupIcon className='headerIcon' />
                                <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)}>{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                                <Box ref={roomselect}>
                                    {
                                        openOptions && <Box className='options'>
                                            <Box className="optionItem">
                                                <Typography className="optionText">Adult</Typography>
                                                <Box className="optionCounter">
                                                    <Btn disabled={options.adult <= 1} className='optionCounterButton' onClick={() => handleOption("adult", "d")}>-</Btn>
                                                    <Typography className="optionCounterNumber">{options.adult}</Typography>
                                                    <Btn className='optionCounterButton' onClick={() => handleOption("adult", "i")}>+</Btn>
                                                </Box>
                                            </Box>
                                            <Box className="optionItem">
                                                <Typography className="optionText">Children</Typography>
                                                <Box className="optionCounter">
                                                    <Btn disabled={options.children <= 0} className='optionCounterButton' onClick={() => handleOption("children", "d")}>-</Btn>
                                                    <Typography className="optionCounterNumber">{options.children}</Typography>
                                                    <Btn className='optionCounterButton' onClick={() => handleOption("children", "i")}>+</Btn>
                                                </Box>
                                            </Box>
                                            <Box className="optionItem">

                                                <Typography className="optionText">Room</Typography>
                                                <Box className="optionCounter">
                                                    <Btn disabled={options.room <= 1} className='optionCounterButton' onClick={() => handleOption("room", "d")}>-</Btn>
                                                    <Typography className="optionCounterNumber">{options.room}</Typography>
                                                    <Btn className='optionCounterButton' onClick={() => handleOption("room", "i")}>+</Btn>
                                                </Box>
                                            </Box>
                                        </Box>
                                    }
                                </Box>
                            </Box>
                            <Box className="headerSearchItem">
                                <Button className='headerBtn'>Submit</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default BookingBar