import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const getAllCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE__URL}/learning/course/all`);
    console.log("Get all courses API called");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error in get All courses Api: ", error);
  }
};
