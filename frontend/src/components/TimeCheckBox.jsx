import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from '@mui/material';
import { times } from '../data';
import dayjs from 'dayjs';
const classTimes = ['9:00', '11:00', '3:00', '5:00'];
// '2023-02-11T05:00:00.000Z';

const TimeCheckBox = ({ date, createClasses }) => {
  const [activeCheck, setActiveCheck] = useState([]);
  // const classObj = classTimes.map((slot) => {
  //   const obj = { id: `${date}-${slot}`, time: slot };
  //   return obj;
  // });

  const addClasses = () => {
    createClasses(activeCheck);
  };

  const handleCheck = (obj) => {
    if (found(obj.id)) {
      setActiveCheck(activeCheck.filter((slot) => slot.id !== obj.id));
    } else {
      const checkedBox = { id: obj.id, time: obj.time, slots: 20 };
      setActiveCheck([...activeCheck, checkedBox]);
    }
  };

  const found = (id) => {
    return activeCheck.find((time) => time.id === id);
  };

  const handleChange = (event, id) => {
    const slotToUpdate = activeCheck.find((time) => time.id === id);
    slotToUpdate.slots = Number(event.target.value);
    setActiveCheck(
      activeCheck.map((slot) =>
        slot.id === slotToUpdate.id ? slotToUpdate : slot
      )
    );
  };

  return (
    <FormControl>
      <FormLabel>Class Times</FormLabel>
      <Box sx={{ display: 'flex' }}>
        {times.map((slot) => {
          return (
            <Box
              sx={{ display: 'flex', flexDirection: 'column' }}
              key={slot.id}
            >
              <FormControlLabel
                value={dayjs(slot.time).format('h:mma')}
                control={<Checkbox />}
                label={dayjs(slot.time).format('h:mma')}
                name={slot.time}
                labelPlacement="top"
                onClick={() => handleCheck(slot)}
              />
              {found(slot.id) && (
                <>
                  <FormLabel>Slots</FormLabel>
                  <TextField
                    label="slots"
                    name="slots"
                    defaultValue={20}
                    sx={{ width: 50 }}
                    onChange={(event) => handleChange(event, slot.id)}
                  ></TextField>
                </>
              )}
            </Box>
          );
        })}
        {activeCheck && <Button onClick={addClasses}>Add Classes</Button>}
      </Box>
    </FormControl>
  );
};

export default TimeCheckBox;
