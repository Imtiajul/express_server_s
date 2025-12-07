import express from "express";
import { userCntrollers } from "./user.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = express.Router();

// ADD USER
router.post('/', userCntrollers.createUser);

router.get("/", logger, auth("user"), userCntrollers.getAllUsers);

router.get("/:id", userCntrollers.getSingleUser);

router.put("/:id", userCntrollers.updateSingleUser);

router.delete("/:id", userCntrollers.deleteSingleUser);

export const userRoutes = router;