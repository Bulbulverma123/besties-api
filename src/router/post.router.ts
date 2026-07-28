import {Router } from 'express'
import { createPost, fetchPosts } from '../controller/post.controller'
const PostRouter = Router()

PostRouter.post('/', createPost)
PostRouter.get('/', fetchPosts)


export default PostRouter
