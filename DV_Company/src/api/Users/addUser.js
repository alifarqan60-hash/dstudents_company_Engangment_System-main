import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const addUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE__URL}/auth/register`, data);
    const result = response.data;
    console.log("Following User is added: ", result);
    return result;
  } catch (err) {
    console.log("User API not working");
    console.error("Error adding new user: ", err);
  }
};
