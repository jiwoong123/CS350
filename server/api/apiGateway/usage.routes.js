import express from "express";
import { getUsage, getUsages } from "../controller/usage.controller.js";

const router = express.Router();

//router.get("/equipment-info",)
router.get("/equipment-usages", getUsages);
router.get("/equipment-usage", getUsage);

export default router;
