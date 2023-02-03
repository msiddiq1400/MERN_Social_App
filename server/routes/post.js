import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { getFeedPosts, getUserPosts, likePost } from "../controller/posts.js";

const router = express.Router()

/* READ */
router.get('/', getFeedPosts)
router.get("/:userId/posts", getUserPosts)

/* UPDATE */
router.patch("/:id/like", likePost)

export default router;