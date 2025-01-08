import express from "express";
import { createNewPost,fetchAllPosts,fetchPostsByUser,deletePost,editPost } from "../Controller/postController";
import { authenticateUser } from "../midleware/auth";
import { validateRequest } from "../midleware/validationMiddleware";
import { postSchema } from "../validation/postValidation";
const router = express.Router();
router.post("/",authenticateUser,validateRequest(postSchema), createNewPost);
router.get("/post", fetchAllPosts);
router.get("/post/fetch/:userId", fetchPostsByUser);
router.delete("/post/delete/:id",authenticateUser,deletePost)
router.put("/post/update/:postId",editPost)

export default router;