import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { times } from '../data';
import dateServices from '../services/date';

const TimeCheckBox = ({ date, createClasses }) => {
  const [activeCheck, setActiveCheck] = useState([]);
  const defaultNumberOfSlots = 3;

  const addClasses = () => {
    const timesToCreate = activeCheck.map((a) => {
      return {
        time: a.time,
      };
    });
    createClasses(timesToCreate);
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
                label={dateServices.time(slot.time)}
                name={dateServices.time(slot.time)}
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
