import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userServices from '../services/user';

const initialState = {
  userDetails: null,
  status: 'pending',
  alert: null,
  error: null,
};

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (data, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const newUser = await userServices.register(data);
      return newUser;
    } catch (error) {
      throw thunkAPI.rejectWithValue('username must be unique');
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (data, thunkAPI) => {
    try {
      const user = await userServices.login(data);
      return user;
    } catch (error) {
      throw thunkAPI.rejectWithValue('invalid username or password');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'users/logoutUser',
  async (data, thunkAPI) => {
    try {
      const response = await userServices.logout();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAlertMessage(state) {
      state.alert = null;
    },
    clearErrorMessage(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'pending';
        state.alert = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.alert = action.payload.message;
        state.userDetails = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'pending';
        state.alert = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.alert = action.payload.message;
        state.userDetails = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.alert = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.status = 'pending';
        state.alert = null;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.alert = action.payload.message;
        state.userDetails = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.alert = null;
        state.error = action.error;
      });
  },
});

export const { clearAlertMessage, clearErrorMessage } = userSlice.actions;
export default userSlice.reducer;
