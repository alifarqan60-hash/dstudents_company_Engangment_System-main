import axiosInstance from "../config/api"

export const getAlldatasets = async () => {
    try {

        const response = await axiosInstance.get(`/dataset/getAll`)
        return response.data;
    } catch (error) {
        console.log("error is : ", error)
    }
}

export const getDatasetById = async (id) => {
    try {
        const response = await axiosInstance.get(`/dataset/${id}`);
        return response.data;
    } catch (error) {
        console.log("error is : ", error);
    }
};

export const uploadDataset = async (body) => {
    try {

        const response = await axiosInstance.post(`/dataset/upload`, body)
        return response.data;
    } catch (error) {
        console.log("error is : ", error)
    }
}