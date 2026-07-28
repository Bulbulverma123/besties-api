import { SessionInterface } from "../middleware/auth.middleware"
import PostModel from "../model/post.model"
import { CatchError } from "../util/error"
import {Response} from "express"

export const createPost = async (req: SessionInterface, res: Response) =>{
   try{
     req.body.user = req.session?.id
     const post = await PostModel.create(req.body)
     res.json(post)
   }  
   catch(err)
   {
     CatchError(err, res, "Failed to create post")
   }
}

export const fetchPosts = async (req: SessionInterface, res: Response) =>{
   try{
    const posts = await PostModel.find().sort({createdAt: -1})
    res.json(posts)
   }  
   catch(err)
   {
     CatchError(err, res, "Failed to fetch post")
   }
}