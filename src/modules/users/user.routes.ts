import express, { Request, Response } from "express";
import { userCntrollers } from "./user.controller";

const router = express.Router();

// ADD USER
router.post('/', userCntrollers.createUser);

router.get("/", userCntrollers.getAllUsers);

router.get("/:id", userCntrollers.getSingleUser);

router.put("/:id", userCntrollers.updateSingleUser);

router.delete("/:id", userCntrollers.deleteSingleUser);
  export const userRoutes = router;