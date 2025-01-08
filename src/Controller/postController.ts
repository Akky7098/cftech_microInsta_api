 import { Request,Response } from "express";
import { createPost,getAllPosts,getPostsByUser,deletePostById,updatePost } from "../Services/postService";

//------------------------------Create a post for user-----------------------------
export const createNewPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const post = req.body;
      const userId = req.body.userId;
      const {title,description,images} = post;
      if( !title || !description || ! images)(
        res.status(400).json({status:false,message:" tile,description,image is missing while creating post"})
      )
      if (!userId) {
        res.status(401).json({ status: false, message: "Unauthorized access" });
        return;
      }
      post.userId = userId;
     const newPost= await createPost(post);
      res.status(201).json({ status: true, message: "Post created successfully",data:newPost });
    } catch (error) {
        console.log("error in creating post",(error as any)?.message)
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  };

  //-------------------------------- Get All posts-------------------------------

  export const fetchAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await getAllPosts();
      res.status(200).json({
        status: true,
        message: "Posts retrieved successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching all posts:");
      res.status(500).json({
        status: false,
        message: "Failed to fetch posts"
      });
    }
  };
   //------------------------------Get all the posts of users-----------------

  export const fetchPostsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
         res.status(400).json({
          status: false,
          message: "Invalid user ID",
        });
      }
  
      const posts = await getPostsByUser(userId);
  
      if (posts.length === 0) {
         res.status(404).json({
          status: false,
          message: "No posts found for the specified user",
        });
      }
  
      res.status(200).json({
        status: true,
        message: "Posts retrieved successfully",
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching posts by user:",(error as any)?.message);
      res.status(500).json({
        status: false,
        message: "Failed to fetch posts"
      });
    }
  };

  export const deletePost = async(req:Request,res:Response): Promise<void> =>{
        try{
               const id= Number(req.params.id);
               const userId = req.body.userId;
               if(!userId || !id){
                res.status(400).json({
                   status:false,
                   message:"invalid userId or postId"
                })
               }

               const deletedUser = await deletePostById(id,userId);
               res.status(200).json({
                status:true,
                message:"post deleted successfully",
                data:deletedUser
               })
             } catch (error) {
                const errorMessage = (error as any)?.message
                console.error("Error deleting posts by user:",errorMessage);
                res.status(500).json({
                  status: false,
                  message: (error as any)?.message
                });
              }
  }
  export const editPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const postId = Number(req.params.postId);
      const post = req.body;
      if (isNaN(postId)) {
        res.status(400).json({
          status: false,
          message: "Invalid post ID",
        });
        return;
      }
         const updatedPost = await updatePost(post,postId)
  
      res.status(200).json({
        status: true,
        message: "Post successfully updated",
         data:updatedPost
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({
        status: false,
        message: "Failed to update post",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  
  