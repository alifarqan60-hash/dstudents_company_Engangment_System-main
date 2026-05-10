import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axiosInstance from '../../config/api';



const initialState = {
  users:null,
  status: 'idle',
  error: null
};

export const fetchMessageUsers = createAsyncThunk(
  'message/allUsers',
  async ( _ , { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/get-all-users");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);





const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessageUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMessageUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload.users;
        state.error = null;
      })
      .addCase(fetchMessageUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ;
      })
  },
});


export default messageSlice.reducer;
