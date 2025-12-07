import { Request, Response } from "express";
import { userSerivces } from "./user.service";

const createUser = async (req: Request, res: Response) => {    
    try {
        const result = await userSerivces.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Message could not be sent",
            details: error.message,
        })
    }
}

const getAllUsers = async (req: Request, res: Response) => {

    try {
        const result = await userSerivces.getAllUsers()
        //  console.log(result);
        res.status(200).json({
            success: true,
            message: "User data fetch successfully",
            data: result.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Data could not be fetched",
            details: error,
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userSerivces.getSingleUser(req.params.id as string);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User data fetch successfully",
                data: result.rows[0],
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Data could not be fetched",
            details: error.message,
        })
    }
}

const updateSingleUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const result = await userSerivces.updateSingleUser(name, email, req.params.id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            })
        } else {
            res.status(200).json({
                success: true,
                message: "User data updated successfully",
                data: result.rows[0],
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "User could not be updated",
            details: error.message,
        })

    }
}
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userSerivces.deleteSingleUser(req.params.id as string);
    
    if(result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "User data deleted successfully",
          data: null,
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "User could not be deleted",
      details: error.message,
    })
  }
}

export const userCntrollers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
}