
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/AuthSlice';
import progressReducer from './course/ProgressSlice';
import coursesReducer from './course/CoursesSlice';
import courseReducer from './course/CourseSlice';
import messageSlice from './message/messageSlice';
import newsSlice from './news/newsSlice';
const store = configureStore({
  reducer: {
    auth: authReducer, 
    progress: progressReducer,
    courses: coursesReducer,
    course: courseReducer,
    message: messageSlice,
    news: newsSlice

  },
});

export default store;
