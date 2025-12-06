import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodos = async (req: Request, res: Response) => {

  try {
    const result = await todoServices.createTodos(req.body);
    if(result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "User data updated successfully",
          data: result.rows[0],
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "User could not be updated",
      details: error.message,
    })
  }
}

const getAllTodos = async (req: Request, res:Response) => {

  try {
   const result = await todoServices.getAllTodos();
  //  console.log(result);
    res.status(200).json({
      success: true,
      message: "Todos data retrived successfully",
      data: result.rows,
    })
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Data could not be fetched",
      details: error,
    })
  }
}
const getSingleTodo = async (req: Request, res: Response) => {

  try {
    const result = await todoServices.getSingleTodo(req.params.id!);
 
    if(result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Todos not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "Todos fetch successfully",
          data: result.rows[0],
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Data could not be fetched",
      details: error.message,
    })
  }
}
const updateSingleTodo = async (req: Request, res: Response) => {
      try {
          const result = await todoServices.updateSingleTodo(req.params.id!, req.body);
  
          if (result.rows.length === 0) {
              res.status(404).json({
                  success: false,
                  message: "Todo was not found",
                  data: null,
              })
          } else {
              res.status(200).json({
                  success: true,
                  message: "Todo data updated successfully",
                  data: result.rows[0],
              })
          }
      } catch (error: any) {
          res.status(500).json({
              success: false,
              message: "Todo could not be updated",
              details: error.message,
          })
  
      }
}
const deleteSingleTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deleteSingleTodo(req.params.id!);
    // console.log(result);
    if(result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Todo not found",
        data: null,
      })} else {
        res.status(200).json({
          success: true,
          message: "Todo data deleted successfully",
          data: null,
        })
      }
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Todo item could not be deleted",
      details: error.message,
    })
  }
}

export const todoControllers = {
  createTodos,
  getAllTodos,
  getSingleTodo,
  updateSingleTodo,
  deleteSingleTodo,
}