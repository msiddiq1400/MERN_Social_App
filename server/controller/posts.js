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

export const getFeedPosts = async (req, res) => {

}

export const getUserPosts = async (req, res) => {

}

export const likePost = async (req, res) => {

}