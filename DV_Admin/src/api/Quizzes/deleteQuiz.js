import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const deleteQuiz = async (quizId) => {
  try {
    const response = await axios.delete(
      `${API_BASE__URL}/learning/quiz/${quizId}`
    );
    const result = response.data;
    console.log("Delete Quiz API called: ", result);
    return "Quiz Deleted Successfully";
  } catch (error) {
    console.log("Error in deleting quiz API: ", error);
    return "Failed to delete quiz";
  }
};
