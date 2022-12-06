const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memoriesSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    tags: [
        {
            type: String
        }
    ],
    img_url: {
        type: String,
        unique: true,
    },
    likeCount: {
        type: Number,
        default: 0
    },
    created: {
        type: Date, 
        default: new Date()
    },
    user:{
        type: Object,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Memories', memoriesSchema);