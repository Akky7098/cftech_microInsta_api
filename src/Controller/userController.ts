import { Request, Response } from "express";
import { getAllUser,login } from "../Services/userService";

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUser();
    res.status(200).json({
      status: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { mobileNumber } = req.body;  // Assuming you're sending mobileNumber in the request body

  try {
    // Call the login function from the service
    const token = await login(mobileNumber);

    // Send the token as response
    res.status(200).json({
      status: true,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("Error in login controller:", (error as any)?.message);
    res.status(400).json({
      status: false,
      message: (error as any)?.message || "Login failed",
    });
  }
};
