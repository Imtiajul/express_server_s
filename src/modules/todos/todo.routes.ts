import  { Router }  from "express";
import { todoControllers } from "./todo.controller";



const router = Router();

router.post('/', todoControllers.createTodos);
router.get("/", todoControllers.getAllTodos);
router.get("/:id", todoControllers.getSingleTodo);
router.put("/:id", todoControllers.updateSingleTodo);
router.delete("/:id", todoControllers.deleteSingleTodo);

export const todoRoutes = router;