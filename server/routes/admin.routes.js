import express from "express";
import { adminLogin, adminLogout, adminRegister } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.post("/logout", adminLogout);

export default router;
