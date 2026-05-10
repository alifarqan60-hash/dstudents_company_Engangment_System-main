import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const getAllJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE__URL}/jobs/get-all`);
    console.log("Getting all jobs API called");
    console.log("Jobs: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getting all jobs API: ", error);
  }
};
