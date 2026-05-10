import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const addJob = async (data) => {
  try {
    const response = await axios.post(`${API_BASE__URL}/jobs/create`, data);
    const result = response.data;
    console.log("Following Job is added: ", result);
    return result;
  } catch (err) {
    console.log("Job added API not working");
    console.error("Error adding new job: ", err);
  }
};
