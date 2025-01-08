import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./Routes/user.routes";
import postRoutes from "./Routes/postRoutes";

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

export default app;
