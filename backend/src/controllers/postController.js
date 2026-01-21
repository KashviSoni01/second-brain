const Post = require("../models/post")

async function createPost(req, res) {
    const title = req.body.title
    const link = req.body.link
    const type = req.body.type

    if(!link || !title || !type) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    try {
        const post = await Post.create({
            title,
            link, 
            type,
            userId: req.session.userId
        })

        return res.status(200).json({
            message: "Post Created"
        })
    } catch(e) {
        return res.status(500).json({
            message: "Failed to create Post"
        })
    }

}

async function seePost(req, res) {
    const userId = req.session.userId;

    const posts = await Post.find({
        userId: userId
    })
    return res.json({
        posts
    })
}

async function deletePost(req, res) {
    const postId = req.params.postId
    const userId = req.session.userId

    const result = await Post.deleteOne({
        _id: postId,
        userId: userId
    })

    if (result.deletedCount === 0) {
        return res.status(404).json({
            message: "Post not found or you are not authorized"
        })
    }

    return res.status(200).json({
        message: "Post deleted successfully"
    })
}

module.exports = {createPost, seePost, deletePost}