import Post from "../models/Post.js"
import User from "../models/User.js"

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();
        const post = await Post.find();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(409).json({msg: err.message})
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        return res.status(200).json(post);
    } catch (err) {
        return res.status(404).json({msg: err.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params
        const post = await Post.findById(userId);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(404).json({msg: err.message})
    }
}

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const {id} = req.params
        const {userId} = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)
        if(isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }
        //new to true, to return the document after update is applied
        const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true});
        return res.status(200).json(updatedPost);
    } catch (err) {
        return res.status(404).json({msg: err.message})
    }
}