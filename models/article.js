
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  username: {
    type: String,
    ref: "user",
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
})

module.exports = mongoose.model("Blog", blogSchema)