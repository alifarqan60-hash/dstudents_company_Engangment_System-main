import axios from "axios";
import { API_BASE__URL } from "../config/api";

export const getAlldatasets = async () => {
  try {
    const response = await axios.get(`${API_BASE__URL}/dataset/getAll`);
    console.log("Get All Datasets API called");
    console.log("all datasetdata is : ", response.data);
    return response.data;
  } catch (error) {
    console.log("error is : ", error);
  }
};

export const uploadDataset = async (body) => {
  try {
    const response = await axiosInstance.post(`/dataset/upload`, body);
    return response.data;
  } catch (error) {
    console.log("error is : ", error);
  }
};
