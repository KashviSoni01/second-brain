const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["youtube", "twitter"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema)
module.exports = Post