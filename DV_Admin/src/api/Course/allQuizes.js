import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const getAllQuizes = async () => {
  try {
    const response = await axios.get(`${API_BASE__URL}/learning/quiz/all`);
    console.log("Get all quizes API called");
    console.log(response.data.allQuiz);
    return response.data.allQuiz;
  } catch (error) {
    console.log("Error in get All quizes Api: ", error);
  }
};
