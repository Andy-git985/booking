import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import scheduleServices from '../services/schedule';

const initialState = {
  appointments: [],
  status: 'pending',
  error: null,
};

export const retrieveAppointments = createAsyncThunk(
  'schedule/retrieveAppointments',
  async (_, thunkAPI) => {
    try {
      const schedule = await scheduleServices.getSchedule();
      return schedule;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(retrieveAppointments.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(retrieveAppointments.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.appointments = action.payload;
        state.error = null;
      })
      .addCase(retrieveAppointments.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload.error;
      });
  },
});

export default scheduleSlice.reducer;
