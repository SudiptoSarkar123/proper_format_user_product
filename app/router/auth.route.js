import express from "express";
import authController from "../controller/auth.controller.js";
import authCheck from "../middleware/authCheck.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/roll", authController.createRoll);

export default router