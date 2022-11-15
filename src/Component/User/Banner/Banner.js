import { Box, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import './Banner.scss'
import FilterBar from '../BookingBar';

const Banner = ({ type }) => {
  return (
    <Fragment>
      <Box className={type === "list" ? "headerHideBox" : "header_box"}>
        <Box className='containerBox'>
          <Box className='headerBoxSecond'>
            <Typography className='headerTextTitle' variant='h4' component='h1'>
              A lifetime of discounts? It's Genius.
            </Typography>
            <Typography>Search low prices on hotels, homes and much more...</Typography>
          </Box>
          {type !== "list" &&
            <>
              <FilterBar />
            </>}
        </Box>

      </Box>

    </Fragment>
  )
}

export default Banner









// import { Box, Paper, Typography } from '@mui/material'
// import React, { Fragment, useState } from 'react'
// import HotelIcon from '@mui/icons-material/Hotel';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import GroupIcon from '@mui/icons-material/Group';
// import './Banner.scss'
// import { Btn, Button, Input, Select } from '../../syledcomponent/StyledComponent';
// import { DateRange } from 'react-date-range'
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { format } from 'date-fns'
// import { useRef } from 'react';
// import useClickOutside from '../../../helper/clickOutside';
// import useFetch from '../../../helper/useFetch'
// import { useDispatch } from 'react-redux'
// import { SEARCH_DATA } from '../../../redux/types';
// import { useNavigate } from 'react-router-dom'
// import axiosInstance from '../../../helper/axiosInstance';

// const Banner = ({ type }) => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { data, loading, error } = useFetch('/getAllPlace')
//   const [destination, setDestination] = useState("Kochi")
//   const [allData, setAllData] = useState(null)
//   const [open, setOpen] = useState(false)
//   const [dates, setDates] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
//       key: 'selection'
//     }
//   ]);
//   const Menu = useRef(null)
//   useClickOutside(Menu, () => {
//     setOpen(false)
//   })

//   const Option = useRef(null)
//   useClickOutside(Option, () => {
//     setOpenOptions(false)
//   })

//   const [openOptions, setOpenOptions] = useState(false)
//   const [options, setOptions] = useState({
//     adult: 1,
//     children: 0,
//     room: 1,
//   })

//   const handleOption = (name, operations) => {
//     setOptions(prev => {
//       return { ...prev, [name]: operations === "i" ? options[name] + 1 : options[name] - 1 }
//     })
//   }

//   const handleSearch = async () => {
//     console.log("hai");
//     const { data } = await axiosInstance.post('/serachHotel', { destination, dates, options })
//     console.log(data);
//     dispatch({ type: SEARCH_DATA, payload: { search: data, location: destination, dates: dates, options: options } })
//     navigate("/hotel", { state: { destination, dates, options } })
//   }
//   return (
//     <Fragment>
//       {/* //<Box className={type === "list" ? "headerHideBox" : "header_box"}></Box> */}
//       <Box className="header_box">
//         <Box className='containerBox'>
//           <Box className='headerBoxSecond'>
//             <Typography className='headerTextTitle' variant='h4' component='h1'>
//               A lifetime of discounts? It's Genius.
//             </Typography>
//             <Typography>Search low prices on hotels, homes and much more...</Typography>
//           </Box>
//           {type !== "list" &&
//             <>
//               <Paper className='bookingFied'>
//                 <Box className='headerSearch'>
//                   <Box className="headerSearchItem">
//                     <HotelIcon className='headerIcon' />
//                     <Select
//                       name='place'
//                       className="headerSearchInput"
//                       onChange={(e) => setDestination(e.target.value)}
//                     >
//                       {
//                         data?.map((item, index) => (
//                           <option className='opt' key={index} value={item}>{item}</option>
//                         ))
//                       }

//                     </Select>
//                   </Box>
//                   <Box className="headerSearchItem">
//                     <CalendarMonthIcon className='headerIcon' />
//                     <span onClick={() => { setOpen(!open) }} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
//                     <Box ref={Menu}>
//                       {open && <DateRange
//                         editableDateInputs={true}
//                         onChange={item => setDates([item.selection])}
//                         moveRangeOnFirstSelection={false}
//                         months={2}
//                         direction="horizontal"
//                         className='date'
//                         ranges={dates}
//                       />}
//                     </Box>

//                   </Box>
//                   <Box className="headerSearchItem">
//                     <GroupIcon className='headerIcon' />
//                     <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)}>{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
//                     <Box ref={Option}>
//                       {
//                         openOptions && <Box className='options'>
//                           <Box className="optionItem">
//                             <Typography className="optionText">Adult</Typography>
//                             <Box className="optionCounter">
//                               <Btn disabled={options.adult <= 1} className='optionCounterButton' onClick={() => handleOption("adult", "d")}>-</Btn>
//                               <Typography className="optionCounterNumber">{options.adult}</Typography>
//                               <Btn className='optionCounterButton' onClick={() => handleOption("adult", "i")}>+</Btn>
//                             </Box>
//                           </Box>
//                           <Box className="optionItem">
//                             <Typography className="optionText">Children</Typography>
//                             <Box className="optionCounter">
//                               <Btn disabled={options.children <= 0} className='optionCounterButton' onClick={() => handleOption("children", "d")}>-</Btn>
//                               <Typography className="optionCounterNumber">{options.children}</Typography>
//                               <Btn className='optionCounterButton' onClick={() => handleOption("children", "i")}>+</Btn>
//                             </Box>
//                           </Box>
//                           <Box className="optionItem">

//                             <Typography className="optionText">Room</Typography>
//                             <Box className="optionCounter">
//                               <Btn disabled={options.room <= 1} className='optionCounterButton' onClick={() => handleOption("room", "d")}>-</Btn>
//                               <Typography className="optionCounterNumber">{options.room}</Typography>
//                               <Btn className='optionCounterButton' onClick={() => handleOption("room", "i")}>+</Btn>
//                             </Box>
//                           </Box>
//                         </Box>
//                       }
//                     </Box>
//                   </Box>
//                   <Box className="headerSearchItem">
//                     <Button className='headerBtn' onClick={handleSearch}>Submit</Button>
//                   </Box>
//                 </Box>
//               </Paper> </>}
//         </Box>

//       </Box>

//     </Fragment>
//   )
// }

// export default Banner