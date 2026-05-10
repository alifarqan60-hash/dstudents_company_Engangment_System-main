import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const deleteLesson = async (courseId, lectureId) => {
  try {
    const response = await axios.delete(
      `${API_BASE__URL}/learning/lecture/${courseId}/del/${lectureId}`
    );
    const result = response.data;
    console.log("Delete Lesson API called: ", result);
    return "Lesson Deleted Successfully";
  } catch (error) {
    console.log("Error in deleting Lesson API: ", error);
    return "Failed to delete Lesson";
  }
};
