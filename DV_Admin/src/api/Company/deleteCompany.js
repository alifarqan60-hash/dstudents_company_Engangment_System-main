import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const deleteCompany = async (companyId) => {
  try {
    const response = await axios.delete(
      `${API_BASE__URL}/company/${companyId}`
    );
    const result = response.data;
    console.log("Delete Company API called: ", result);
    return "Company Deleted Successfully";
  } catch (error) {
    console.log("Error in deleting company API: ", error);
    return "Failed to delete company";
  }
};
