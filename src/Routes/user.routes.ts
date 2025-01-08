import express from "express";
import { getUser,loginController
 } from "../Controller/userController";

const router = express.Router();

router.get("/", getUser);
router.post("/login",loginController)

export default router;
