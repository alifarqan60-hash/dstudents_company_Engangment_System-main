import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const addLesson = async (lesson) => {
  try {
    const response = await axios.post(
      `${API_BASE__URL}/learning/lecture/create`,
      lesson
    );
    const result = response.data;
    console.log("Following Lesson is added: ", result);
    return result;
  } catch (err) {
    console.log("Error in add lesson API: ", err);
  }
};
