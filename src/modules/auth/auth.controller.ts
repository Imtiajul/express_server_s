import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    
    try {
        const result = await authService.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            details: error.message,
        })
    }
}

export const authController = {
    loginUser,
}