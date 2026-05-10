import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const getAllQuizzes = async () => {
  try {
    const response = await axios.get(`${API_BASE__URL}/learning/quiz/all`);
    console.log("Getting all quizzes API called");
    console.log("Quizes: ", response.data.users);
    return response.data.users;
  } catch (error) {
    console.log("Error in getting all quizzes API: ", error);
  }
};
