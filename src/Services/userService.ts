
import db from "../config/dbconfig";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

   import { User } from "../interface/userInterface";

    export const getAllUser = async() :Promise<User[]> =>{

         const [rows] = await db.execute("SELECT * FROM users");
         return rows as User[];

    };

    export const login = async(mobileNumber:Number) : Promise<string> =>{
       try{
         const [rows] = await db.execute("SELECT * FROM users WHERE mobileNumber = ?",[mobileNumber]
         )
         if ((rows as any).length === 0) {
            throw new Error("User not found");
          }
          const user = (rows as any)[0];
          const payload = {
            user:user.id
          }

           const token = await jwt.sign(payload,process.env.JWT_SEcRET!,{expiresIn:"5d"});
           return token;
    }
    catch(error){
      console.log("error in login",(error as any)?.message)
      throw error;
  }
    }

