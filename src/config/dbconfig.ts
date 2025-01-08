import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

pool.getConnection()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err.message);
    process.exit(1); // Exit the app if the connection fails
  });

export default pool;
