import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE__URL}/auth/${userId}`);
    const result = response.data;
    console.log("Delete User API called: ", result);
    return "User Deleted Successfully";
  } catch (error) {
    console.log("Error in deleting user API: ", error);
    return "Failed to delete user";
  }
};
