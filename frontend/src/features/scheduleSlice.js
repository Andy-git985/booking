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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addNewAppointments = createAsyncThunk(
  'schedule/addNewAppointments',
  async (data, thunkAPI) => {
    try {
      const newSchedule = await scheduleServices.createNew(data);
      return newSchedule;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const reserveAppointment = createAsyncThunk(
  'schedule/reserveAppointment',
  async (data, thunkAPI) => {
    try {
      const { id, person } = data;
      const updatedAppointment = await scheduleServices.reserveTime(id, person);
      return updatedAppointment;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearScheduleAlert(state, action) {
      state.alert = '';
    },
    clearScheduleError(state, action) {
      state.error = '';
    },
  },
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
      })
      .addCase(addNewAppointments.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(addNewAppointments.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.alert = action.payload.message;
        state.appointments.concat(action.payload.data);
        state.error = null;
      })
      .addCase(addNewAppointments.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      })
      .addCase(reserveAppointment.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(reserveAppointment.fulfilled, (state, action) => {
        const updatedAppt = action.payload.data;
        state.status = 'fulfilled';
        state.appointments = state.appointments.map((appt) =>
          appt.id === updatedAppt.id ? updatedAppt : appt
        );
        state.error = null;
      })
      .addCase(reserveAppointment.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message;
      });
  },
});

export const { clearScheduleAlert, clearScheduleError } = scheduleSlice.actions;
export default scheduleSlice.reducer;
