import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const addQuiz = async (quiz) => {
  try {
    const response = await axios.post(
      `${API_BASE__URL}/learning/quiz/create`,
      quiz
    );
    const result = response.data;
    console.log("Following Quiz is added: ", result);
    return result;
  } catch (err) {
    console.log("Error in add lesson API: ", err);
  }
};
