import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const addCompany = async (data) => {
  const response = await axios.post(`${API_BASE__URL}/company/create`, data, {
    withCredentials: true,
  });
  return response.data;
};
