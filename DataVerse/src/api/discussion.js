import axiosInstance from "../config/api"

export const createDiscussion = async (data) => {
    try {
        const response = await axiosInstance.post(`/discussion/create`, data)
        return response.data;
    } catch (error) {
        console.log("error is : ", error)
    }
}


export const getAllDiscussion = async (data) => {
    try {
        const response = await axiosInstance.get(`/discussion`, data)
        return response.data;
    } catch (error) {
        console.log("error is : ", error)
    }
}


export const getDiscussionById = async (id) => {
    try {
        const response = await axiosInstance.get(`/discussion/${id}`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error)
    }
}


export const AddReplyToDiscussion = async (discussionId, data) => {
    try {
        const response = await axiosInstance.post(`/discussion/${discussionId}/reply`, data)
        return response.data;
    } catch (error) {
        console.log("error is : ", error)
    }
}


export const VoteReply = async (discussionId, replyId, voteType) => {
    try {
        const response = await axiosInstance.post(`/discussion/${discussionId}/reply/${replyId}/vote`, { voteType });
        return response.data;
    } catch (error) {
        console.log("error is : ", error);
    }
};


export const getMyDiscussions = async () => {
    try {
        const response = await axiosInstance.get(`/discussion/me`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error)
    }
}



export const getTrendingDiscussions = async () => {
    try {
        const response = await axiosInstance.get(`/discussion/trending`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error)
    }
}