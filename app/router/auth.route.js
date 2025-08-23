import express from "express";
import authController from "../controller/auth.controller.js";
import authCheck from "../middleware/authCheck.js";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/roll", authController.createRoll);

export default router