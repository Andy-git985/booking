import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userServices from '../services/user';

const initialState = {
  userDetails: null,
  employees: null,
  isLoading: false,
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
      const errorMessage = error.response.data.error;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (data, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const user = await userServices.login(data);
      return user;
    } catch (error) {
      const errorMessage = error.response.data.error;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'users/logoutUser',
  async (data, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const response = await userServices.logout();
      return response;
    } catch (error) {
      const errorMessage = error.response.data.error;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (data, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const response = await userServices.getAccountInfo();
      return response;
    } catch (error) {
      const errorMessage = error.response.data.error;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getEmployeeDetails = createAsyncThunk(
  'user/getEmployeeDetails',
  async (data, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const response = await userServices.getEmployeeDetails();
      return response;
    } catch (error) {
      const errorMessage = error.response.data.error;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserAlert(state) {
      state.alert = null;
    },
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.alert = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alert = action.payload.message;
        state.userDetails = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.alert = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alert = action.payload.message;
        state.userDetails = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.alert = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
        state.alert = null;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alert = action.payload.message;
        state.userDetails = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.alert = null;
        state.error = action.payload;
      })
      .addCase(getUserDetails.pending, (state, action) => {
        state.isLoading = true;
        state.alert = null;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alert = null;
        state.userDetails = action.payload;
        state.error = null;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.alert = null;
        state.error = action.payload;
      })
      .addCase(getEmployeeDetails.pending, (state, action) => {
        state.isLoading = true;
        state.alert = null;
        state.error = null;
      })
      .addCase(getEmployeeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.alert = null;
        state.employees = action.payload;
        state.error = null;
      })
      .addCase(getEmployeeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.alert = null;
        state.error = action.payload;
      });
  },
});

export const { clearUserAlert, clearUserError } = userSlice.actions;
export default userSlice.reducer;
