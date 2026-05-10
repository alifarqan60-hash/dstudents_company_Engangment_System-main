import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/api';



const initialState = {
  enrolledCourses:null,
  status: 'idle',
  error: null
};

export const fetchUserProgress = createAsyncThunk(
  'progress/fetchUserProgress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/progress');
  
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProgress.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.enrolledCourses = action.payload.enrolledCourses;
        state.error = null;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ;
      })
  },
});


export default progressSlice.reducer;
