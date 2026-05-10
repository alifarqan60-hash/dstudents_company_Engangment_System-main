import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const deleteJob = async (jobId) => {
  try {
    const response = await axios.delete(`${API_BASE__URL}/jobs/${jobId}`);
    const result = response.data;
    console.log("Delete JOb API called: ", result);
    return "Job Deleted Successfully";
  } catch (error) {
    console.log("Error in deleting job API: ", error);
    return "Failed to job user";
  }
};
