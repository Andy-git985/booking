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
// '2023-02-11T05:00:00.000Z';

const TimeCheckBox = ({ date, createClasses }) => {
  const [activeCheck, setActiveCheck] = useState([]);
  const defaultNumberOfSlots = 3;

  const addClasses = () => {
    activeCheck.forEach((a) => {
      delete a.id;
    });
    createClasses(activeCheck);
  };

  const found = (id) => {
    return activeCheck.find((time) => time.id === id);
  };

  const handleCheck = (obj) => {
    if (found(obj.id)) {
      setActiveCheck(activeCheck.filter((slot) => slot.id !== obj.id));
    } else {
      const checkedBox = {
        id: obj.id,
        time: obj.time,
        slots: defaultNumberOfSlots,
      };
      setActiveCheck([...activeCheck, checkedBox]);
    }
  };

  const handleSlotChange = (event, id) => {
    const slotToUpdate = activeCheck.find((time) => time.id === id);
    slotToUpdate.slots = Number(event.target.value);
    setActiveCheck(
      activeCheck.map((slot) =>
        slot.id === slotToUpdate.id ? slotToUpdate : slot
      )
    );
  };

  const fullTimes = times.map((slot) => {
    return { ...slot, time: `${date}T${slot.time}` };
  });

  return (
    <FormControl>
      <FormLabel>Class Times</FormLabel>
      <Box sx={{ display: 'flex' }}>
        {fullTimes.map((slot) => {
          return (
            <Box
              sx={{ display: 'flex', flexDirection: 'column' }}
              key={slot.id}
            >
              <FormControlLabel
                value={slot.time}
                control={<Checkbox />}
                label={dayjs(slot.time).format('h:mma')}
                name={dayjs(slot.time).format('h:mma')}
                labelPlacement="top"
                onClick={() => handleCheck(slot)}
              />
              {found(slot.id) && (
                <>
                  <FormLabel>Slots</FormLabel>
                  <TextField
                    label="slots"
                    name="slots"
                    defaultValue={defaultNumberOfSlots}
                    sx={{ width: 50 }}
                    onChange={(event) => handleSlotChange(event, slot.id)}
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
