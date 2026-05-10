import axios from "axios";
import { API_BASE__URL } from "../config/api";

export const getAllNews = async () => {
  try {
    const response = await axios.get(`${API_BASE__URL}/news/all`, {
      withCredentials: true,
    });
    console.log("all news : ", response?.data);
    return response?.data;
  } catch (error) {
    console.log("error is : ", error);
  }
};
