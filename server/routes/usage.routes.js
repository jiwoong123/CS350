import express from "express";
import { getUsages } from "../controller/usage.controller.js";

const router = express.Router();

//router.get("/equipment-info",)
router.get("/equipment-usage", getUsages);

export default router;
