import axios from "axios";
import { API_BASE__URL } from "../../config/api";

export const deleteCourse = async (courseId) => {
    try {
        const response = await axios.delete(
            `${API_BASE__URL}/learning/course/delete/${courseId}`,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error in deleting course API: ", error);
        throw error;
    }
};
