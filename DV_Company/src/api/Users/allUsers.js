import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE__URL}/auth/get-all-users`);
    console.log("Getting all user API called");
    console.log("Users: ", response.data.users);
    return response.data.users;
  } catch (error) {
    console.log("Error in getting all user API: ", error);
  }
};
