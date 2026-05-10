import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axiosInstance from '../../config/api';



const initialState = {
  course:null,
  status: 'idle',
  currentLecture:null,
  error: null
};

export const fetchSingleCourse = createAsyncThunk(
  'courses/fetchCourses',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/learning/course/${courseId}`);
      console.log("Courses: ", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const completeLecture = createAsyncThunk(
'courses/completeLecture',
  async ({lectureId, courseId}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/learning/lecture/completed/${courseId}/${lectureId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const enrollCourse = createAsyncThunk(
  'courses/enrollCourse',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/learning/course/enroll/${courseId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {

      setCurrentLecture: (state,action) => {
        state.currentLecture = action.payload;

      },
      goToNextLecture: (state, action) => {
        state.currentLecture = state.currentLecture+1;
      }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSingleCourse.fulfilled, (state, action) => {
        state.status = 'idle';
        state.course = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ;
      })
      .addCase(enrollCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(enrollCourse.fulfilled, (state) => {
        state.status = 'idle';
        state.currentLecture = 1;
        state.error = null;
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ;
      })
  },
});


export const { setCurrentLecture, goToNextLecture } = courseSlice.actions;
export default courseSlice.reducer;
