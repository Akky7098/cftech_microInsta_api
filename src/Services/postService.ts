   import db from "../config/dbconfig";
    import {Post} from "../interface/postInterface";

    export const createPost = async (post: Post): Promise<any> => {
      const connection = await db.getConnection(); 
      try {
        await connection.beginTransaction();
        const [newPost] = await db.execute(
          "INSERT INTO posts (title, description, userId, images) VALUES (?, ?, ?, ?)",
          [post.title, post.description, post.userId, JSON.stringify(post.images)]
        );
        await db.execute(
          "UPDATE users SET postCount = postCount + 1 WHERE id = ?",
          [post.userId]
        );
    
        await connection.commit();
    
        return newPost;
      } catch (error) {
        await connection.rollback();
        console.error("Error creating post:",(error as any)?.message);
        throw new Error("Unable to create post");
      }
    };
    export const getAllPosts = async (): Promise<Post[]> => {
      const [rows] = await db.execute("SELECT * FROM posts");
      return rows as Post[];
    };
    
    export const getPostsByUser = async (userId: number): Promise<Post[]> => {
      const [rows] = await db.execute("SELECT * FROM posts WHERE userId = ?", [userId]);
      return rows as Post[];
    };


// ---------------------delete Post of user ------------------------------------------------

    export const deletePostById = async(id:number,userId: number): Promise<any> =>{
          const connection = await db.getConnection();
         try{
             await connection.beginTransaction();  
       const [rows] = await db.execute("Delete  FROM posts where id =? AND userId = ?",[id,userId]);
       if((rows as any).affectedRows === 0){
          throw new Error("No posts found for this user or the post was already deleted.")
       }
       await connection.execute(
        "UPDATE users SET postCount = postCount - 1 WHERE id = ?",
        [userId]
      );
      await connection.commit();
       return rows;
     } catch (error) {
        await connection.rollback();
        console.error("Error in deleteing post:",(error as any)?.message);
        throw new Error("Unable to delete post");
      } 
    
  }

  //----------------------------edit post of user --------------------------------------

  export const updatePost = async (post: Partial<Post>, postId: number): Promise<void> => {
    const updates: string[] = [];
    const values: any[] = [];
  
    if (post.title !== undefined) {
      updates.push("title = ?");
      values.push(post.title);
    }
    if (post.description !== undefined) {
      updates.push("description = ?");
      values.push(post.description);
    }
    if (post.images !== undefined) {
      updates.push("images = ?");
      values.push(JSON.stringify(post.images));
    }
  
    if (updates.length === 0) {
      throw new Error("No fields provided to update");
    }
  
    values.push(postId);
    const query = `UPDATE posts SET ${updates.join(", ")} WHERE id = ?`;
  
    const [result]: any = await db.execute(query, values);
  
    if (result.affectedRows === 0) {
      throw new Error("Post not found or no changes made.");
    }
  };