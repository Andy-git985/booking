import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import scheduleServices from '../services/schedule';

const initialState = {
  data: [],
  isLoading: true,
  alert: null,
  error: null,
};

export const retrieveSchedule = createAsyncThunk(
  'schedule/retrieveSchedule',
  async (_, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const schedule = await scheduleServices.getSchedule();
      return schedule;
    } catch (error) {
      const errorMessage = error.response.data.error;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const addNewSchedule = createAsyncThunk(
  'schedule/addNewSchedule',
  async (data, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());

      const newSchedule = await scheduleServices.createNew(data);
      return newSchedule;
    } catch (error) {
      const errorMessage = error.response.data.error;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const reserveAppointment = createAsyncThunk(
  'schedule/reserveAppointment',
  async (data, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const updatedAppointment = await scheduleServices.reserveTime(data);
      return updatedAppointment;
    } catch (error) {
      // console.log('error', error); //default message: {message: "Request failed with status code 401"}
      // console.log('error response data error', error.response.data.error); // "token expired" => from middleware
      const errorMessage = error.response.data.error;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearScheduleAlert(state, action) {
      state.alert = null;
    },
    clearScheduleError(state, action) {
      state.error = null;
    },
    restoreAvailability(state, action) {
      const { id } = action.payload;
      state.data = state.data.map((data) =>
        data.id === id ? action.payload : data
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveSchedule.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(retrieveSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(retrieveSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addNewSchedule.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewSchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alert = action.payload.message;
        state.data = state.data.concat(action.payload.data);
        state.error = null;
      })
      .addCase(addNewSchedule.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(reserveAppointment.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(reserveAppointment.fulfilled, (state, action) => {
        const updatedAppt = action.payload.data;
        console.log('action payload', action.payload);
        state.isLoading = false;
        state.data = state.data.map((appt) =>
          appt.id === updatedAppt.id ? updatedAppt : appt
        );
        state.error = null;
      })
      .addCase(reserveAppointment.rejected, (state, action) => {
        // console.log('rejected', action.payload); // token expired => middleware
        // console.log('action error', action.error); // { message: rejected }
        // console.log('message present?', action.error.message); // yes see above
        state.isLoading = false;
        state.error = action.payload;
        // return action payload to get middleware message
      });
  },
});

export const { clearScheduleAlert, clearScheduleError, restoreAvailability } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
