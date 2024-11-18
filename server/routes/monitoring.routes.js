import express from "express";
import { login, logout, register } from "../controller/auth.controller.js";
import { initialEquipment } from "../controller/admin/admin.equipment.controller.js";

const router = express.Router();

//router.get("/equipment-info",)
router.get("/equipment-usage", register);

export default router;
