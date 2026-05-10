import axiosInstance from "../config/api";

export const getUserDetails = async(userId) =>{
    try {
        const response = await axiosInstance.get(`/auth/${userId}`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error )
    }
}
