import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axiosInstance from '../../config/api';



const initialState = {
  news:null,
  status: 'idle',
  error: null
};

export const fetchNews = createAsyncThunk(
  'news/all',
  async ( _ , { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/news/all");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);





const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'idle';
        state.news = action.payload;
        state.error = null;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ;
      })
  },
});


export default newsSlice.reducer;
