const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mediaSchema = new Schema({
    img_url: {
        type: String,
        unique: true,
        required: true,
    }
})

module.exports = mongoose.model("Media", mediaSchema)