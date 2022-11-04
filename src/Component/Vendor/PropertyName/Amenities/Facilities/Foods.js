import { Box } from '@mui/material';
import React, { useState } from 'react'
import { Input,Button } from './Styled';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Foods = () => {
    const [serviceList, setServiceList] = useState([{ service: "" }]);

    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...serviceList];
        list[index][name] = value;
        setServiceList(list);
    };

    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    };

    const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: "" }]);
    };
  return (
    <>
    <Box>
        {serviceList.map((singleService, index) => (
            <Box key={index} className="services">
                <Box className="first-division">
                    <Input hidden/>
                    <Input
                        name="service"
                        type="text"
                        id="service"
                        className='inputfield'
                        value={singleService.service}
                        onChange={(e) => handleServiceChange(e, index)}
                        required
                    />
                </Box>
                {serviceList.length - 1 === index && serviceList.length < 6 && (
                    <Box className="second-division">
                        <AddIcon
                            type="button"
                            className='addicon'
                            onClick={handleServiceAdd}
                        />
                    </Box>
                )}
                {serviceList.length !== 1 && (
                    <Box className="third-division">
                        <DeleteOutlineIcon
                            type="button"
                            onClick={() => handleServiceRemove(index)}
                            className="remove-btn"
                        />
                    </Box>
                )}
            </Box>
        ))}
        <Button>Submit</Button>
    </Box>
</>
  )
}

export default Foods
