import { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from '@mui/material';
const classTimes = ['9:00', '11:00', '3:00', '5:00'];

const TimeCheckBox = ({ date }) => {
  const [activeCheck, setActiveCheck] = useState([]);
  const classObj = classTimes.map((c) => {
    const obj = { id: `${date}-${c}`, time: c };
    return obj;
  });

  const handleCheck = (id) => {
    if (found(id)) {
      setActiveCheck(activeCheck.filter((c) => c !== id));
    } else {
      setActiveCheck([...activeCheck, id]);
    }
  };

  const found = (id) => {
    return activeCheck.includes(id);
  };

  return (
    <FormControl>
      <FormLabel>Class Times</FormLabel>
      <Box sx={{ display: 'flex' }}>
        {classObj.map((c) => {
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }} key={c.id}>
              <FormControlLabel
                value={c.time}
                control={<Checkbox />}
                label={c.time}
                labelPlacement="top"
                onClick={() => handleCheck(c.id)}
              />
              {found(c.id) && (
                <TextField
                  label="slots"
                  value={20}
                  sx={{ width: 50 }}
                ></TextField>
              )}
            </Box>
          );
        })}
      </Box>
    </FormControl>
  );
};

export default TimeCheckBox;
