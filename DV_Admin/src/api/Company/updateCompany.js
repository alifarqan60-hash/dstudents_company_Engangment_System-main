import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const updateCompany = async (id, data) => {
    const response = await axios.put(`${API_BASE__URL}/company/${id}`, data, {
        withCredentials: true,
    });
    return response.data;
};
