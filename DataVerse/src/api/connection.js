import axiosInstance from "../config/api"

export const getMayKnowUsers = async() =>{
    try {
        const response = await axiosInstance.get(`/connection/may-know`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error )
    }
}

export const sendFriendRequest = async(receiverId) =>{
    try {
        const response = await axiosInstance.post(`/connection/${receiverId}/request`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error )
    }
}

export const getAllFriendRequest = async() =>{
    try {
        const response = await axiosInstance.get(`/connection/requests`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error )
    }
}



export const acceptFriendRequest = async(requestId) =>{
    try {
        const response = await axiosInstance.patch(`/connection/${requestId}/accept`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error )
    }
}

export const rejectFriendRequest = async(requestId) =>{
    try {
        const response = await axiosInstance.patch(`/connection/${requestId}/reject`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error )
    }
}


export const getAllFriends = async() =>{
    try {
        const response = await axiosInstance.get(`/connection/friends`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error )
    }
}