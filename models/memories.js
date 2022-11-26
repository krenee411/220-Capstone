import mongoose from "mongoose";

const memoriesSchema = mongoose.Schema({
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date, 
        default: new Date()
    }
})

const memories =mongoose.model('memories', memoriesSchema);

export default memories;