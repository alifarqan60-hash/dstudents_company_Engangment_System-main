import mongoose from "mongoose";

const DatasetSchema = new mongoose.Schema({

    url:{
        type: String,
    },
    imgurl:{
        type: String,
    },
    title:{
        type: String,
        required:true  
    },
    description:{
        type: String,
        required:true  
    },
    tags: [
        {
            type: String
        }
    ],
    
},{ timestamps:true}
);

export default mongoose.model("Dataset",DatasetSchema);