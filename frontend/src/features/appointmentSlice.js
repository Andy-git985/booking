import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appointmentServices from '../services/appointment';

const initialState = {
  data: null,
  status: 'pending',
  alert: null,
  error: null,
};

export const reserveAppt = createAsyncThunk(
  'appointments/reserve',
  async (data, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const newappointment = await appointmentServices.createNew(data);
      return newappointment;
    } catch (error) {
      console.error(error);
      const errorMessage = error.response.data.error;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const getUserAppts = createAsyncThunk(
  'appointments/user',
  async (data, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const userAppts = await appointmentServices.getUser(data);
      return userAppts;
    } catch (error) {
      const errorMessage = error.response.data.error;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reserveAppt.pending, (state, action) => {
        state.status = 'pending';
        state.alert = null;
        state.error = null;
      })
      .addCase(reserveAppt.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.alert = action.payload.message;
        state.data.push(action.payload.data);
        state.error = null;
      })
      .addCase(reserveAppt.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(getUserAppts.pending, (state, action) => {
        state.status = 'pending';
        state.alert = null;
        state.error = null;
      })
      .addCase(getUserAppts.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.alert = action.payload.message;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getUserAppts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;
