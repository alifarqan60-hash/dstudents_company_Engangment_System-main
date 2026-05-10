import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const getAllCompanies = async () => {
  try {
    const response = await axios.get(`${API_BASE__URL}/company/allCompanies`);
    console.log("All Companies API called");
    console.log("Companies: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in getting all companies API: ", error);
  }
};
