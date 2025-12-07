import express, { NextFunction, Request, Response } from "express";
import createDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/users/user.routes";
import { todoRoutes } from "./modules/todos/todo.routes";
import { authRoutes } from "./modules/auth/auth.route";

const app = express()

createDB();

// parser
app.use(express.json());

// logger middleware
app.get('/', logger, (req: Request, res:Response) => {
  res.send('Hello Next Lever Coders!')
})

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);

// 404 route not found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
});


export default app;